// src/components/Grid.jsx
import React from 'react';
import Node from './Node';
import './Grid.css';

function Grid({ grid, onMouseDown, onMouseEnter, onMouseUp }) {
  return (
    <div className="grid-wrapper">
      <table className="grid-table" onMouseLeave={onMouseUp}>
        <tbody>
          {grid.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map(node => (
                <Node
                  key={`${node.row}-${node.col}`}
                  row={node.row}
                  col={node.col}
                  isStart={node.isStart}
                  isEnd={node.isEnd}
                  isWall={node.isWall}
                  isWeight={node.isWeight}
                  isVisited={node.isVisited}
                  isShortestPath={node.isShortestPath}
                  onMouseDown={onMouseDown}
                  onMouseEnter={onMouseEnter}
                  onMouseUp={onMouseUp}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grid;
