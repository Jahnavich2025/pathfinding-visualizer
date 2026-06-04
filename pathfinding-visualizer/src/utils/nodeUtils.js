// src/utils/nodeUtils.js

export const NODE_TYPES = {
  EMPTY: 'empty',
  WALL: 'wall',
  START: 'start',
  END: 'end',
  VISITED: 'visited',
  SHORTEST_PATH: 'shortest-path',
  WEIGHT: 'weight',
};

export const GRID_ROWS = 22;
export const GRID_COLS = 52;

/**
 * Creates a fresh node object.
 */
export function createNode(row, col, startRow, startCol, endRow, endCol) {
  const isStart = row === startRow && col === startCol;
  const isEnd = row === endRow && col === endCol;
  return {
    row,
    col,
    isStart,
    isEnd,
    isWall: false,
    isWeight: false,
    distance: Infinity,
    heuristic: 0,
    totalCost: Infinity,
    isVisited: false,
    previousNode: null,
  };
}

/**
 * Generates a fresh grid.
 */
export function generateGrid(startRow, startCol, endRow, endCol) {
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(createNode(row, col, startRow, startCol, endRow, endCol));
    }
    grid.push(currentRow);
  }
  return grid;
}

/**
 * Returns the shortest path by backtracking from the end node.
 */
export function getShortestPath(endNode) {
  const path = [];
  let current = endNode;
  while (current !== null) {
    path.unshift(current);
    current = current.previousNode;
  }
  return path;
}

/**
 * Deep-clones a grid (resets visited/distance state but preserves walls/weights/start/end).
 */
export function resetGridForVisualization(grid) {
  return grid.map(row =>
    row.map(node => ({
      ...node,
      distance: Infinity,
      heuristic: 0,
      totalCost: Infinity,
      isVisited: false,
      previousNode: null,
    }))
  );
}

/**
 * Returns valid (non-wall) neighbors.
 */
export function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < GRID_ROWS - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < GRID_COLS - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(n => !n.isWall);
}

/**
 * Manhattan distance heuristic for A*.
 */
export function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

/**
 * Generates a random maze using recursive division.
 */
export function generateMaze(grid, startRow, startCol, endRow, endCol) {
  const newGrid = grid.map(row =>
    row.map(node => ({
      ...node,
      isWall: false,
      isVisited: false,
      previousNode: null,
      distance: Infinity,
    }))
  );

  // Add border walls
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (r === 0 || r === GRID_ROWS - 1 || c === 0 || c === GRID_COLS - 1) {
        if (!(r === startRow && c === startCol) && !(r === endRow && c === endCol)) {
          newGrid[r][c].isWall = true;
        }
      }
    }
  }

  divide(newGrid, 1, GRID_ROWS - 2, 1, GRID_COLS - 2, startRow, startCol, endRow, endCol);
  return newGrid;
}

function divide(grid, rowStart, rowEnd, colStart, colEnd, sR, sC, eR, eC) {
  if (rowEnd - rowStart < 2 || colEnd - colStart < 2) return;

  const horizontal = rowEnd - rowStart > colEnd - colStart;

  if (horizontal) {
    const possibleRows = [];
    for (let r = rowStart + 1; r < rowEnd; r += 2) possibleRows.push(r);
    if (!possibleRows.length) return;
    const wallRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

    const possibleCols = [];
    for (let c = colStart; c <= colEnd; c += 2) possibleCols.push(c);
    const passageCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

    for (let c = colStart; c <= colEnd; c++) {
      const node = grid[wallRow][c];
      if (c !== passageCol && !(node.isStart || node.isEnd)) {
        node.isWall = true;
      }
    }
    divide(grid, rowStart, wallRow - 1, colStart, colEnd, sR, sC, eR, eC);
    divide(grid, wallRow + 1, rowEnd, colStart, colEnd, sR, sC, eR, eC);
  } else {
    const possibleCols = [];
    for (let c = colStart + 1; c < colEnd; c += 2) possibleCols.push(c);
    if (!possibleCols.length) return;
    const wallCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

    const possibleRows = [];
    for (let r = rowStart; r <= rowEnd; r += 2) possibleRows.push(r);
    const passageRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

    for (let r = rowStart; r <= rowEnd; r++) {
      const node = grid[r][wallCol];
      if (r !== passageRow && !(node.isStart || node.isEnd)) {
        node.isWall = true;
      }
    }
    divide(grid, rowStart, rowEnd, colStart, wallCol - 1, sR, sC, eR, eC);
    divide(grid, rowStart, rowEnd, wallCol + 1, colEnd, sR, sC, eR, eC);
  }
}
