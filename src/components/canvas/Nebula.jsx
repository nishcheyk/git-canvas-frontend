import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Nebula component rendering distant colorful cloud dust.
 * Created using large, intersecting additive blending spheres for maximum performance.
 */
export default function Nebula() {
  const groupRef = useRef();

  // Slow ambient rotation of the cosmic background dust
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.002;
      groupRef.current.rotation.z += delta * 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* TypeScript Blue Cloud */}
      <mesh position={[-35, -8, -45]}>
        <sphereGeometry args={[22, 16, 16]} />
        <meshBasicMaterial
          color="#3178C6"
          transparent={true}
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* CSS/Rust Violet Cloud */}
      <mesh position={[30, 12, -50]}>
        <sphereGeometry args={[26, 16, 16]} />
        <meshBasicMaterial
          color="#aa3bff"
          transparent={true}
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* JavaScript Yellow Cloud */}
      <mesh position={[5, -20, -35]}>
        <sphereGeometry args={[18, 16, 16]} />
        <meshBasicMaterial
          color="#F7DF1E"
          transparent={true}
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* HTML Red Cloud */}
      <mesh position={[-20, 25, -60]}>
        <sphereGeometry args={[24, 16, 16]} />
        <meshBasicMaterial
          color="#E34C26"
          transparent={true}
          opacity={0.015}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
