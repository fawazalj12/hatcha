import React, { useState } from 'react';
import './App.css';
import ParameterPanel from './components/ParameterPanel';
import SimulationCanvas from './components/SimulationCanvas';
import AIAssistantPanel from './components/AIAssistantPanel';
import ExportControl from './components/ExportControl';

function App() {
  const [simulationData, setSimulationData] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ROH Simulator</h1>
      </header>
      <main>
        <div className="main-container">
          <div className="left-panel">
            <ParameterPanel setSimulationData={setSimulationData} />
            <AIAssistantPanel />
          </div>
          <div className="right-panel">
            <SimulationCanvas simulationData={simulationData} />
            <ExportControl />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
