// src/algorithms/dijkstra.js
import { getNeighbors } from '../utils/nodeUtils';

/**
 * Dijkstra's Algorithm — guarantees shortest path.
 * Returns all visited nodes in order.
 */
export function dijkstra(grid, startNode, endNode) {
  const visitedInOrder = [];
  startNode.distance = 0;

  const unvisited = getAllNodes(grid);

  while (unvisited.length) {
    sortByDistance(unvisited);
    const closest = unvisited.shift();

    if (closest.isWall) continue;
    if (closest.distance === Infinity) return visitedInOrder; // surrounded by walls

    closest.isVisited = true;
    visitedInOrder.push(closest);

    if (closest === endNode) return visitedInOrder;

    updateNeighbors(closest, grid);
  }

  return visitedInOrder;
}

function getAllNodes(grid) {
  return grid.flat();
}

function sortByDistance(nodes) {
  nodes.sort((a, b) => a.distance - b.distance);
}

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid).filter(n => !n.isVisited);
  for (const neighbor of neighbors) {
    const newDist = node.distance + (neighbor.isWeight ? 5 : 1);
    if (newDist < neighbor.distance) {
      neighbor.distance = newDist;
      neighbor.previousNode = node;
    }
  }
}
