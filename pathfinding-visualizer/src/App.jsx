// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Legend from './components/Legend';
import { usePathfinder } from './hooks/usePathfinder';
import './App.css';

function App() {
  const {
    grid,
    algorithm,
    setAlgorithm,
    isRunning,
    isDone,
    drawMode,
    setDrawMode,
    speed,
    setSpeed,
    stats,
    runAlgorithm,
    resetGrid,
    buildMaze,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = usePathfinder();

  const handleClearPath = () => resetGrid(true);

  return (
    <div className="app" onMouseUp={handleMouseUp}>
      <Navbar
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        drawMode={drawMode}
        setDrawMode={setDrawMode}
        speed={speed}
        setSpeed={setSpeed}
        isRunning={isRunning}
        isDone={isDone}
        onRun={runAlgorithm}
        onReset={resetGrid}
        onClearPath={handleClearPath}
        onMaze={buildMaze}
        stats={stats}
      />

      <main className="app-main">
        <Grid
          grid={grid}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />
      </main>

      <Legend />
    </div>
  );
}

export default App;
