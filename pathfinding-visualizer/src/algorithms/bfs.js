// src/algorithms/bfs.js
import { getNeighbors } from '../utils/nodeUtils';

/**
 * Breadth-First Search — guarantees shortest path on unweighted grids.
 * Returns all visited nodes in order.
 */
export function bfs(grid, startNode, endNode) {
  const visitedInOrder = [];
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length) {
    const current = queue.shift();
    if (current.isWall) continue;

    visitedInOrder.push(current);
    if (current === endNode) return visitedInOrder;

    const neighbors = getNeighbors(current, grid).filter(n => !n.isVisited);
    for (const neighbor of neighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = current;
      queue.push(neighbor);
    }
  }

  return visitedInOrder;
}
