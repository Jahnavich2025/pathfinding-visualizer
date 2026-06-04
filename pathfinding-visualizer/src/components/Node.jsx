// src/components/Node.jsx
import React, { memo } from 'react';
import './Node.css';

function Node({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isWeight,
  isVisited,
  isShortestPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  let className = 'node';
  if (isStart) className += ' node-start';
  else if (isEnd) className += ' node-end';
  else if (isShortestPath) className += ' node-shortest-path';
  else if (isVisited) className += ' node-visited';
  else if (isWall) className += ' node-wall';
  else if (isWeight) className += ' node-weight';

  return (
    <td
      id={`node-${row}-${col}`}
      className={className}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    >
      {isStart && <span className="node-icon">▶</span>}
      {isEnd && <span className="node-icon">◆</span>}
      {isWeight && !isStart && !isEnd && <span className="node-icon weight-icon">⚖</span>}
    </td>
  );
}

export default memo(Node);
