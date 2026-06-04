// src/components/Legend.jsx
import React from 'react';
import './Legend.css';

const LEGEND_ITEMS = [
  { className: 'legend-start',   label: 'Start Node',      icon: '▶' },
  { className: 'legend-end',     label: 'End Node',        icon: '◆' },
  { className: 'legend-wall',    label: 'Wall',            icon: '' },
  { className: 'legend-weight',  label: 'Weight (×5)',     icon: '⚖' },
  { className: 'legend-visited', label: 'Visited',         icon: '' },
  { className: 'legend-path',    label: 'Shortest Path',   icon: '' },
];

function Legend() {
  return (
    <div className="legend">
      {LEGEND_ITEMS.map(item => (
        <div key={item.label} className="legend-item">
          <div className={`legend-swatch ${item.className}`}>
            {item.icon && <span className="legend-swatch-icon">{item.icon}</span>}
          </div>
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
      <div className="legend-hint">
        <span>Drag ▶ / ◆ to move · Click/drag to draw</span>
      </div>
    </div>
  );
}

export default Legend;
