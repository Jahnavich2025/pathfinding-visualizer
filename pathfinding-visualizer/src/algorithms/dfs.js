// src/algorithms/dfs.js
import { getNeighbors } from '../utils/nodeUtils';

/**
 * Depth-First Search — does NOT guarantee shortest path.
 * Returns all visited nodes in order.
 */
export function dfs(grid, startNode, endNode) {
  const visitedInOrder = [];
  const stack = [startNode];

  while (stack.length) {
    const current = stack.pop();
    if (current.isWall || current.isVisited) continue;

    current.isVisited = true;
    visitedInOrder.push(current);

    if (current === endNode) return visitedInOrder;

    const neighbors = getNeighbors(current, grid).filter(n => !n.isVisited);
    for (const neighbor of neighbors) {
      if (!neighbor.previousNode) neighbor.previousNode = current;
      stack.push(neighbor);
    }
  }

  return visitedInOrder;
}
