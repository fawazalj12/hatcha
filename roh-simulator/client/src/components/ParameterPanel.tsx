import React, { useState } from 'react';

interface ParameterPanelProps {
  setSimulationData: (data: any) => void;
}

const ParameterPanel: React.FC<ParameterPanelProps> = ({ setSimulationData }) => {
  const [freq, setFreq] = useState(10.0);
  const [amp, setAmp] = useState(1.0);
  const [harmonics, setHarmonics] = useState(4);
  const [observerFunc, setObserverFunc] = useState('lambda x: x');

  const runSimulation = async () => {
    const response = await fetch('/simulate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        freq,
        amp,
        harmonics,
        observer_func: observerFunc,
      }),
    });
    const data = await response.json();
    setSimulationData(data);
  };

  return (
    <div className="panel">
      <h2>Parameters</h2>
      <div>
        <label>Frequency:</label>
        <input
          type="range"
          min="1"
          max="100"
          value={freq}
          onChange={(e) => setFreq(parseFloat(e.target.value))}
        />
        <span>{freq}</span>
      </div>
      <div>
        <label>Amplitude:</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={amp}
          onChange={(e) => setAmp(parseFloat(e.target.value))}
        />
        <span>{amp}</span>
      </div>
      <div>
        <label>Harmonics:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={harmonics}
          onChange={(e) => setHarmonics(parseInt(e.target.value))}
        />
        <span>{harmonics}</span>
      </div>
      <div>
        <h3>Custom Observer Function</h3>
        <p>
          Enter a Python lambda function that takes one argument (x) and returns a number.
          <br />
          Example: <code>lambda x: x**2 * np.sin(x)</code>
        </p>
        <input
          type="text"
          value={observerFunc}
          onChange={(e) => setObserverFunc(e.target.value)}
          style={{ width: '100%', padding: '10px' }}
        />
      </div>
      <button onClick={runSimulation}>Run Simulation</button>
    </div>
  );
};

export default ParameterPanel;
