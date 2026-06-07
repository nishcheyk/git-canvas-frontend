import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Nebula component rendering distant colorful cloud dust.
 * Created using large, intersecting additive blending planes with a soft radial alpha gradient texture.
 */
export default function Nebula() {
  const groupRef = useRef();

  // Slow ambient rotation of the cosmic background dust
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.005;
    }
  });

  // Dynamically generate a soft radial alpha gradient texture
  const softTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Radial gradient: white and fully opaque at center, fading out to transparent at edge
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <group ref={groupRef}>
      {/* TypeScript Blue Cloud */}
      <mesh position={[-25, -10, -35]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#3178C6"
          map={softTexture}
          transparent={true}
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* CSS/Rust Violet Cloud */}
      <mesh position={[22, 10, -38]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial
          color="#aa3bff"
          map={softTexture}
          transparent={true}
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* JavaScript Yellow Cloud */}
      <mesh position={[5, -15, -30]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color="#F7DF1E"
          map={softTexture}
          transparent={true}
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* HTML Red Cloud */}
      <mesh position={[-15, 20, -40]}>
        <planeGeometry args={[55, 55]} />
        <meshBasicMaterial
          color="#E34C26"
          map={softTexture}
          transparent={true}
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
