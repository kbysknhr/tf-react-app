import React, {useState, useEffect} from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
// import './App.css';

const PlyViewer = () => {
  const [model, setModel] = useState<THREE.Points | null>(null);

  useEffect(() => {
    const loader = new PLYLoader();
    loader.load(
      // './ply/airplane.ply',
      // './ply/dolphins.ply',
      './ply/230310_040clip.ply',
      (geometry) => {
        // const material = new THREE.MeshStandardMaterial();
        const material = new THREE.PointsMaterial({ vertexColors: true, size: 0.01,});
        // const mesh = new THREE.Mesh(geometry, material);
        // setModel(() => mesh);
        const particles = new THREE.Points(geometry, material);
        setModel(() => particles);
      },
      (progress) => {
        console.log("Loading progress:", progress);
      },
      (error) => {
        console.error('Error loading PLY file:', error);
      }
    );
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [3, 0.15, -10], fov: 75, near: 0.1, far: 1000}}
        onCreated={({ camera }) => {
          camera.lookAt(0, -0.1, 0);
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {model && <primitive object={model} />}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default PlyViewer;