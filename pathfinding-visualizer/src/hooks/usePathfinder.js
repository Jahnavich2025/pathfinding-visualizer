// src/hooks/usePathfinder.js
import { useState, useRef, useCallback } from 'react';
import {
  generateGrid,
  resetGridForVisualization,
  getShortestPath,
  generateMaze,
  GRID_ROWS,
  GRID_COLS,
} from '../utils/nodeUtils';
import { dijkstra, astar, bfs, dfs, greedy, ALGORITHMS } from '../algorithms';

const DEFAULT_START = { row: Math.floor(GRID_ROWS / 2), col: 6 };
const DEFAULT_END = { row: Math.floor(GRID_ROWS / 2), col: GRID_COLS - 7 };
const SPEED_MAP = { slow: 60, normal: 20, fast: 5 };

export function usePathfinder() {
  const [grid, setGrid] = useState(() =>
    generateGrid(DEFAULT_START.row, DEFAULT_START.col, DEFAULT_END.row, DEFAULT_END.col)
  );
  const [startPos, setStartPos] = useState(DEFAULT_START);
  const [endPos, setEndPos] = useState(DEFAULT_END);
  const [algorithm, setAlgorithm] = useState(ALGORITHMS.DIJKSTRA);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [drawMode, setDrawMode] = useState('wall'); // 'wall' | 'weight' | 'erase'
  const [speed, setSpeed] = useState('normal');
  const [stats, setStats] = useState(null);

  const mouseIsDown = useRef(false);
  const dragging = useRef(null); // 'start' | 'end' | null
  const timeoutsRef = useRef([]);

  // ─── helpers ────────────────────────────────────────────────────
  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const getNode = useCallback(
    (row, col) => grid[row][col],
    [grid]
  );

  // ─── grid manipulation ──────────────────────────────────────────
  const toggleNode = useCallback(
    (row, col) => {
      if (isRunning) return;
      setGrid(prev => {
        const node = prev[row][col];
        if (node.isStart || node.isEnd) return prev;
        const newGrid = prev.map(r => r.slice());
        const newNode = { ...node };
        if (drawMode === 'wall') {
          newNode.isWall = !newNode.isWall;
          newNode.isWeight = false;
        } else if (drawMode === 'weight') {
          newNode.isWeight = !newNode.isWeight;
          newNode.isWall = false;
        } else {
          newNode.isWall = false;
          newNode.isWeight = false;
        }
        newGrid[row] = [...prev[row]];
        newGrid[row][col] = newNode;
        return newGrid;
      });
    },
    [drawMode, isRunning]
  );

  const moveEndpoint = useCallback(
    (type, row, col) => {
      if (isRunning) return;
      if (type === 'start') {
        const other = endPos;
        if (row === other.row && col === other.col) return;
        setStartPos({ row, col });
        setGrid(prev => {
          const newGrid = prev.map(r => r.map(n => ({ ...n })));
          // clear old start
          prev.forEach((r, ri) =>
            r.forEach((n, ci) => {
              if (n.isStart) newGrid[ri][ci].isStart = false;
            })
          );
          newGrid[row][col].isStart = true;
          newGrid[row][col].isWall = false;
          newGrid[row][col].isWeight = false;
          return newGrid;
        });
      } else {
        const other = startPos;
        if (row === other.row && col === other.col) return;
        setEndPos({ row, col });
        setGrid(prev => {
          const newGrid = prev.map(r => r.map(n => ({ ...n })));
          prev.forEach((r, ri) =>
            r.forEach((n, ci) => {
              if (n.isEnd) newGrid[ri][ci].isEnd = false;
            })
          );
          newGrid[row][col].isEnd = true;
          newGrid[row][col].isWall = false;
          newGrid[row][col].isWeight = false;
          return newGrid;
        });
      }
    },
    [isRunning, startPos, endPos]
  );

  // ─── mouse events ────────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (row, col) => {
      if (isRunning) return;
      mouseIsDown.current = true;
      const node = getNode(row, col);
      if (node.isStart) { dragging.current = 'start'; return; }
      if (node.isEnd) { dragging.current = 'end'; return; }
      toggleNode(row, col);
    },
    [isRunning, getNode, toggleNode]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (!mouseIsDown.current || isRunning) return;
      if (dragging.current) {
        moveEndpoint(dragging.current, row, col);
        return;
      }
      toggleNode(row, col);
    },
    [isRunning, moveEndpoint, toggleNode]
  );

  const handleMouseUp = useCallback(() => {
    mouseIsDown.current = false;
    dragging.current = null;
  }, []);

  // ─── run algorithm ───────────────────────────────────────────────
  const runAlgorithm = useCallback(() => {
    if (isRunning) return;
    clearTimeouts();
    setIsDone(false);
    setStats(null);

    // reset visited state (keep walls/weights)
    const freshGrid = resetGridForVisualization(grid);
    setGrid(freshGrid);

    const start = freshGrid[startPos.row][startPos.col];
    const end = freshGrid[endPos.row][endPos.col];

    let visited;
    const t0 = performance.now();

    switch (algorithm) {
      case ALGORITHMS.ASTAR:   visited = astar(freshGrid, start, end); break;
      case ALGORITHMS.BFS:     visited = bfs(freshGrid, start, end); break;
      case ALGORITHMS.DFS:     visited = dfs(freshGrid, start, end); break;
      case ALGORITHMS.GREEDY:  visited = greedy(freshGrid, start, end); break;
      default:                 visited = dijkstra(freshGrid, start, end);
    }

    const t1 = performance.now();
    const path = getShortestPath(end);
    const found = path[path.length - 1]?.isEnd ?? false;

    setIsRunning(true);
    const delay = SPEED_MAP[speed] || 20;

    // animate visited nodes
    visited.forEach((node, i) => {
      const tid = setTimeout(() => {
        setGrid(prev => {
          const newGrid = prev.map(r => r.slice());
          newGrid[node.row] = [...prev[node.row]];
          newGrid[node.row][node.col] = { ...prev[node.row][node.col], isVisited: true };
          return newGrid;
        });
      }, i * delay);
      timeoutsRef.current.push(tid);
    });

    // animate path
    if (found) {
      path.forEach((node, i) => {
        const tid = setTimeout(() => {
          setGrid(prev => {
            const newGrid = prev.map(r => r.slice());
            newGrid[node.row] = [...prev[node.row]];
            newGrid[node.row][node.col] = {
              ...prev[node.row][node.col],
              isShortestPath: true,
            };
            return newGrid;
          });
        }, visited.length * delay + i * delay * 2);
        timeoutsRef.current.push(tid);
      });
    }

    // done
    const doneTid = setTimeout(() => {
      setIsRunning(false);
      setIsDone(true);
      setStats({
        visited: visited.length,
        path: found ? path.length : 0,
        found,
        timeMs: (t1 - t0).toFixed(2),
      });
    }, visited.length * delay + (found ? path.length * delay * 2 : 0) + 100);
    timeoutsRef.current.push(doneTid);
  }, [algorithm, grid, isRunning, speed, startPos, endPos]);

  // ─── reset ───────────────────────────────────────────────────────
  const resetGrid = useCallback(
    (keepWalls = false) => {
      clearTimeouts();
      setIsRunning(false);
      setIsDone(false);
      setStats(null);
      setGrid(prev => {
        const newGrid = prev.map(r =>
          r.map(n => ({
            ...n,
            isWall: keepWalls ? n.isWall : false,
            isWeight: keepWalls ? n.isWeight : false,
            isVisited: false,
            isShortestPath: false,
            previousNode: null,
            distance: Infinity,
            heuristic: 0,
            totalCost: Infinity,
          }))
        );
        return newGrid;
      });
    },
    []
  );

  // ─── maze ────────────────────────────────────────────────────────
  const buildMaze = useCallback(() => {
    if (isRunning) return;
    clearTimeouts();
    setIsRunning(false);
    setIsDone(false);
    setStats(null);
    setGrid(prev => generateMaze(prev, startPos.row, startPos.col, endPos.row, endPos.col));
  }, [isRunning, startPos, endPos]);

  return {
    grid,
    algorithm,
    setAlgorithm,
    isRunning,
    isDone,
    drawMode,
    setDrawMode,
    speed,
    setSpeed,
    stats,
    runAlgorithm,
    resetGrid,
    buildMaze,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
}
