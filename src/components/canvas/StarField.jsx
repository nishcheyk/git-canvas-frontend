import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Renders a high-performance background starfield using WebGL particles.
 * Constrained inside a large shell surrounding the solar system.
 */
export default function StarField({ count = 1200 }) {
  const pointsRef = useRef();

  // Pre-generate random star coordinates and subtle coloring variance
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute points in a spherical shell between radius 30 and 90
      const radius = 30 + Math.random() * 60;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Warm-white color palette (#FFF8E7) mixed with distant blue stars
      const mix = Math.random();
      if (mix > 0.45) {
        // Warm white star
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.97;
        col[i * 3 + 2] = 0.91;
      } else if (mix > 0.15) {
        // Normal white star
        col[i * 3] = 0.95;
        col[i * 3 + 1] = 0.95;
        col[i * 3 + 2] = 1.0;
      } else {
        // Cosmic blue star
        col[i * 3] = 0.7;
        col[i * 3 + 1] = 0.8;
        col[i * 3 + 2] = 1.0;
      }
    }
    return [pos, col];
  }, [count]);

  // Very slow background space drift
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.008;
      pointsRef.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
