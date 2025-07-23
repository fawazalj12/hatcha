import React from 'react';

interface ExportControlProps {
  simulationData: any;
}

const ExportControl: React.FC<ExportControlProps> = ({ simulationData }) => {
  const exportToCSV = () => {
    if (!simulationData) {
      alert('No simulation data to export!');
      return;
    }

    const headers = ['time', ...Array.from(Array(simulationData.roh_data[0].length).keys()).map(i => `x${i}`)];
    const rows = simulationData.roh_data.map((frame: number[], index: number) => {
      return [index, ...frame];
    });

    let csvContent = "data:text/csv;charset=utf-8,"
        + [headers.join(','), ...rows.map(e => e.join(","))].join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "simulation_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  };

  return (
    <div className="panel">
      <h2>Export</h2>
      <button>Export as Image</button>
      <button>Export as Video</button>
      <button onClick={exportToCSV}>Export as CSV</button>
    </div>
  );
};

export default ExportControl;
