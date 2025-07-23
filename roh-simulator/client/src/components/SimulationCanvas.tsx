import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SimulationCanvasProps {
  simulationData: any;
}

const SimulationCanvas: React.FC<SimulationCanvasProps> = ({ simulationData }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lineRef = useRef<THREE.Line | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera, and renderer
    if (!rendererRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);

      rendererRef.current = renderer;
      sceneRef.current = scene;
      cameraRef.current = camera;
      camera.position.z = 5;
    }

    const animate = () => {
      if (simulationData && lineRef.current) {
        const data = simulationData.roh_data[frameRef.current];
        const points = [];
        for (let i = 0; i < data.length; i++) {
          points.push(new THREE.Vector3(i / 100, data[i], 0));
        }
        lineRef.current.geometry.setFromPoints(points);
        frameRef.current = (frameRef.current + 1) % simulationData.roh_data.length;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      requestAnimationFrame(animate);
    };

    if (simulationData && !lineRef.current) {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const points = [];
      const data = simulationData.roh_data[0];
      for (let i = 0; i < data.length; i++) {
        points.push(new THREE.Vector3(i / 100, data[i], 0));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      lineRef.current = line;
      if (sceneRef.current) {
        sceneRef.current.add(line);
      }
    }

    animate();

    return () => {
      // No need to clean up the renderer here, as it is only created once
    };
  }, [simulationData]);

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};

export default SimulationCanvas;
