// src/components/Navbar.jsx
import React, { useState } from 'react';
import { ALGORITHMS, ALGORITHM_INFO } from '../algorithms';
import './Navbar.css';

const DRAW_MODES = [
  { id: 'wall', label: 'Wall', icon: '▪' },
  { id: 'weight', label: 'Weight ×5', icon: '⚖' },
  { id: 'erase', label: 'Erase', icon: '✕' },
];

const SPEEDS = ['slow', 'normal', 'fast'];

function Navbar({
  algorithm,
  setAlgorithm,
  drawMode,
  setDrawMode,
  speed,
  setSpeed,
  isRunning,
  isDone,
  onRun,
  onReset,
  onClearPath,
  onMaze,
  stats,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const info = ALGORITHM_INFO[algorithm];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-name">PathFinder</span>
      </div>

      <div className="navbar-controls">
        {/* Algorithm selector */}
        <div className="control-group">
          <label className="control-label">Algorithm</label>
          <div className="select-wrapper">
            <select
              className="control-select"
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
              disabled={isRunning}
            >
              {Object.values(ALGORITHMS).map(alg => (
                <option key={alg} value={alg}>
                  {ALGORITHM_INFO[alg].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Speed selector */}
        <div className="control-group">
          <label className="control-label">Speed</label>
          <div className="speed-pills">
            {SPEEDS.map(s => (
              <button
                key={s}
                className={`pill ${speed === s ? 'active' : ''}`}
                onClick={() => setSpeed(s)}
                disabled={isRunning}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Draw mode */}
        <div className="control-group">
          <label className="control-label">Draw</label>
          <div className="speed-pills">
            {DRAW_MODES.map(m => (
              <button
                key={m.id}
                className={`pill ${drawMode === m.id ? 'active' : ''}`}
                onClick={() => setDrawMode(m.id)}
                disabled={isRunning}
                title={m.label}
              >
                <span className="pill-icon">{m.icon}</span> {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="btn btn-ghost" onClick={onMaze} disabled={isRunning} title="Generate Maze">
          Maze
        </button>
        <button className="btn btn-ghost" onClick={onClearPath} disabled={isRunning} title="Clear path only">
          Clear Path
        </button>
        <button className="btn btn-ghost" onClick={() => onReset(false)} disabled={isRunning} title="Reset all">
          Reset
        </button>
        <button
          className="btn btn-primary"
          onClick={onRun}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <span className="spinner" /> Running…
            </>
          ) : isDone ? (
            'Run Again'
          ) : (
            'Visualize!'
          )}
        </button>
        <button
          className="info-btn"
          onClick={() => setShowInfo(v => !v)}
          title="Algorithm info"
        >
          ?
        </button>
      </div>

      {/* Info panel */}
      {showInfo && (
        <div className="info-panel" onClick={() => setShowInfo(false)}>
          <div className="info-card" onClick={e => e.stopPropagation()}>
            <button className="info-close" onClick={() => setShowInfo(false)}>✕</button>
            <h3 className="info-title">{info.label}</h3>
            <p className="info-desc">{info.description}</p>
            <div className="info-badges">
              <span className={`badge ${info.guaranteed ? 'badge-green' : 'badge-red'}`}>
                {info.guaranteed ? '✓ Shortest Path' : '✗ Not Optimal'}
              </span>
              <span className={`badge ${info.weighted ? 'badge-blue' : 'badge-gray'}`}>
                {info.weighted ? '⚖ Weighted' : '— Unweighted'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      {stats && (
        <div className={`stats-bar ${stats.found ? 'found' : 'not-found'}`}>
          {stats.found ? (
            <>
              <span>✓ Path found</span>
              <span>· {stats.visited} nodes explored</span>
              <span>· {stats.path} nodes in path</span>
              <span>· {stats.timeMs}ms</span>
            </>
          ) : (
            <span>✗ No path exists between start and end</span>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
