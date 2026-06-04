// src/algorithms/index.js
export { dijkstra } from './dijkstra';
export { astar } from './astar';
export { bfs } from './bfs';
export { dfs } from './dfs';
export { greedy } from './greedy';

export const ALGORITHMS = {
  DIJKSTRA: 'Dijkstra',
  ASTAR: 'A* Search',
  BFS: 'BFS',
  DFS: 'DFS',
  GREEDY: 'Greedy BFS',
};

export const ALGORITHM_INFO = {
  [ALGORITHMS.DIJKSTRA]: {
    label: "Dijkstra's Algorithm",
    guaranteed: true,
    weighted: true,
    description:
      'Explores nodes in order of distance from the source. Guarantees the shortest path and respects edge weights.',
  },
  [ALGORITHMS.ASTAR]: {
    label: 'A* Search',
    guaranteed: true,
    weighted: true,
    description:
      'Combines Dijkstra with a heuristic (Manhattan distance) to guide exploration. Fastest guaranteed-shortest-path algorithm here.',
  },
  [ALGORITHMS.BFS]: {
    label: 'Breadth-First Search',
    guaranteed: true,
    weighted: false,
    description:
      'Explores layer by layer. Guarantees shortest path on unweighted grids. Ignores node weights.',
  },
  [ALGORITHMS.DFS]: {
    label: 'Depth-First Search',
    guaranteed: false,
    weighted: false,
    description:
      'Dives deep before backtracking. Fast but does NOT guarantee the shortest path.',
  },
  [ALGORITHMS.GREEDY]: {
    label: 'Greedy Best-First',
    guaranteed: false,
    weighted: false,
    description:
      'Always moves toward the target using a heuristic. Very fast but does NOT guarantee the shortest path.',
  },
};
