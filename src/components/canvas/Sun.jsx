import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
/**
 * Renders the central glowing Sun star representing the user profile.
 * Places the user's GitHub avatar at the center using a 3D HTML projection.
 */
export default function Sun({ avatarUrl }) {
  const sunRef = useRef();

  // Slow rotation for the sun surface
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Glowing point light centered on the Sun to illuminate orbiting planets */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={3} 
        distance={60} 
        color="#FF9900" 
        decay={1.2} 
        castShadow
      />
      <ambientLight intensity={0.2} />

      {/* Main Sun Star Mesh */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial 
          color="#FF9900" 
          emissive="#FF5500" 
          emissiveIntensity={2.5} 
          roughness={0.2} 
          metalness={0.1}
        />
      </mesh>

      {/* Sun Corona Outer Glow (using additive transparency) */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial 
          color="#FF7700" 
          transparent 
          opacity={0.12} 
          depthWrite={false}
        />
      </mesh>

      {/* Floating developer profile avatar. 
          Use Drei Html to overlay the DOM image dynamically, bypassing WebGL texture CORS. */}
      {avatarUrl && (
        <Html 
          distanceFactor={10} 
          center 
          pointerEvents="none"
          className="transition-opacity duration-300"
        >
          <div className="relative group flex items-center justify-center">
            {/* Pulsating glowing ring behind avatar */}
            <div className="absolute inset-0 rounded-full bg-orange-500 blur-sm opacity-60 animate-ping" />
            <img 
              src={avatarUrl} 
              alt="GitHub User Avatar" 
              className="relative w-12 h-12 rounded-full border-2 border-yellow-500 shadow-glow-sun object-cover"
            />
          </div>
        </Html>
      )}
    </group>
  );
}
