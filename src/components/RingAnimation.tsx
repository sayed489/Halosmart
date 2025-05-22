import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RingColor } from '../types';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Text } from '@react-three/drei';

interface RingAnimationProps {
  color: RingColor;
  onColorChange: (color: RingColor) => void;
}

const RingAnimation: React.FC<RingAnimationProps> = ({ color, onColorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [heartRate, setHeartRate] = useState(72);
  const [stressLevel, setStressLevel] = useState('LOW');

  const colorValues = {
    black: {
      base: new THREE.Color('#111111'),
      circuit: new THREE.Color('#222222'),
      display: new THREE.Color('#000000'),
    },
    green: {
      base: new THREE.Color('#1DB954'),
      circuit: new THREE.Color('#15803d'),
      display: new THREE.Color('#000000'),
    },
    blue: {
      base: new THREE.Color('#0070F3'),
      circuit: new THREE.Color('#1e40af'),
      display: new THREE.Color('#000000'),
    },
  };

  useEffect(() => {
    const heartRateInterval = setInterval(() => {
      setHeartRate(prev => Math.floor(Math.random() * 10) + 65);
    }, 2000);

    const stressInterval = setInterval(() => {
      const levels = ['LOW', 'MEDIUM', 'HIGH'];
      setStressLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 5000);

    return () => {
      clearInterval(heartRateInterval);
      clearInterval(stressInterval);
    };
  }, []);

  const RingModel = () => {
    const ringGeometry = new THREE.TorusGeometry(1.2, 0.4, 64, 128);
    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: colorValues[color].base,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });

    return (
      <group ref={ringRef}>
        <mesh geometry={ringGeometry} material={ringMaterial} />
        
        <group position={[0, 0, 1.2]} rotation={[0, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.6, 0.1]} />
            <meshPhysicalMaterial
              color={colorValues[color].display}
              metalness={0.5}
              roughness={0.1}
              transparent={true}
              opacity={0.95}
            />
          </mesh>
          
          <Text
            position={[0, 0.15, 0.06]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {`HEART RATE\n${heartRate} bpm`}
          </Text>
          
          <Text
            position={[0, -0.15, 0.06]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {`STRESS\n${stressLevel}`}
          </Text>
        </group>

        <group position={[-0.4, 0, 1]} rotation={[0, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.2, 0.1]} />
            <meshPhysicalMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        <group position={[0.4, 0, 1]} rotation={[0, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
            <meshPhysicalMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        <mesh position={[0.8, 0, 0.9]} rotation={[0, Math.PI / 4, 0]}>
          <planeGeometry args={[0.3, 0.8]} />
          <meshPhysicalMaterial
            color={colorValues[color].circuit}
            metalness={0.8}
            roughness={0.3}
            clearcoat={0.5}
          />
        </mesh>

        <Text
          position={[0.9, 0, 0.6]}
          rotation={[0, Math.PI / 3, 0]}
          fontSize={0.08}
          color="white"
        >
          AMBIQ
        </Text>
        <Text
          position={[0.9, -0.1, 0.6]}
          rotation={[0, Math.PI / 3, 0]}
          fontSize={0.06}
          color="white"
        >
          APOLLO4 LITE
        </Text>
      </group>
    );
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[-5, -5, 5]} intensity={0.5} />
        <spotLight position={[0, 0, -5]} intensity={0.3} />

        <RingModel />
      </Canvas>

      <button
        className="absolute bottom-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full"
        onClick={() => setAutoRotate(!autoRotate)}
      >
        {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
      </button>
    </div>
  );
};

export default RingAnimation;