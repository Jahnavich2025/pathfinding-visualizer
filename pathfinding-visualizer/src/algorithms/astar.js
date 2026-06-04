// src/algorithms/astar.js
import { getNeighbors, manhattanDistance } from '../utils/nodeUtils';

/**
 * A* Algorithm — uses Manhattan heuristic, guarantees shortest path.
 * Returns all visited nodes in order.
 */
export function astar(grid, startNode, endNode) {
  const visitedInOrder = [];

  startNode.distance = 0;
  startNode.heuristic = manhattanDistance(startNode, endNode);
  startNode.totalCost = startNode.heuristic;

  const openSet = [startNode];
  const openSetHash = new Set();
  openSetHash.add(`${startNode.row}-${startNode.col}`);

  while (openSet.length) {
    sortByTotalCost(openSet);
    const current = openSet.shift();
    const key = `${current.row}-${current.col}`;
    openSetHash.delete(key);

    if (current.isWall) continue;

    current.isVisited = true;
    visitedInOrder.push(current);

    if (current === endNode) return visitedInOrder;

    const neighbors = getNeighbors(current, grid).filter(n => !n.isVisited);

    for (const neighbor of neighbors) {
      const tentativeG = current.distance + (neighbor.isWeight ? 5 : 1);
      const nKey = `${neighbor.row}-${neighbor.col}`;

      if (tentativeG < neighbor.distance) {
        neighbor.previousNode = current;
        neighbor.distance = tentativeG;
        neighbor.heuristic = manhattanDistance(neighbor, endNode);
        neighbor.totalCost = neighbor.distance + neighbor.heuristic;

        if (!openSetHash.has(nKey)) {
          openSet.push(neighbor);
          openSetHash.add(nKey);
        }
      }
    }
  }

  return visitedInOrder;
}

function sortByTotalCost(nodes) {
  nodes.sort((a, b) => a.totalCost - b.totalCost || a.heuristic - b.heuristic);
}
