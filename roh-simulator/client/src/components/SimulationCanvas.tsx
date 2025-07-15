import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SimulationCanvasProps {
  simulationData: any;
}

const SimulationCanvas: React.FC<SimulationCanvasProps> = ({ simulationData }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    let line: THREE.Line;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    if (simulationData) {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const points = [];
      const data = simulationData.roh_data[0]; // Use the first frame of the simulation data
      for (let i = 0; i < data.length; i++) {
        points.push(new THREE.Vector3(i / 100, data[i], 0));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      line = new THREE.Line(geometry, material);
      scene.add(line);
    }

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [simulationData]);

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};

export default SimulationCanvas;
