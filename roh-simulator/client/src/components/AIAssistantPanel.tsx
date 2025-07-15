import React, { useState } from 'react';

const AIAssistantPanel = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const askAI = async () => {
    const res = await fetch('/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="panel">
      <h2>AI Assistant</h2>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={askAI}>Ask AI</button>
      </div>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
