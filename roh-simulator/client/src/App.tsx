import React from 'react';
import './App.css';
import ParameterPanel from './components/ParameterPanel';
import SimulationCanvas from './components/SimulationCanvas';
import AIAssistantPanel from './components/AIAssistantPanel';
import ExportControl from './components/ExportControl';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ROH Simulator</h1>
      </header>
      <main>
        <div className="main-container">
          <div className="left-panel">
            <ParameterPanel />
            <AIAssistantPanel />
          </div>
          <div className="right-panel">
            <SimulationCanvas />
            <ExportControl />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
