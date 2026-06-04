// src/algorithms/greedy.js
import { getNeighbors, manhattanDistance } from '../utils/nodeUtils';

/**
 * Greedy Best-First Search — uses heuristic only, NOT guaranteed shortest path.
 * Returns all visited nodes in order.
 */
export function greedy(grid, startNode, endNode) {
  const visitedInOrder = [];

  startNode.heuristic = manhattanDistance(startNode, endNode);
  const openSet = [startNode];

  while (openSet.length) {
    openSet.sort((a, b) => a.heuristic - b.heuristic);
    const current = openSet.shift();

    if (current.isWall || current.isVisited) continue;

    current.isVisited = true;
    visitedInOrder.push(current);

    if (current === endNode) return visitedInOrder;

    const neighbors = getNeighbors(current, grid).filter(n => !n.isVisited);
    for (const neighbor of neighbors) {
      neighbor.heuristic = manhattanDistance(neighbor, endNode);
      if (!neighbor.previousNode) neighbor.previousNode = current;
      openSet.push(neighbor);
    }
  }

  return visitedInOrder;
}
