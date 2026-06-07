import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlanet } from '../../store/slices/universeSlice';
import { getLangClassName } from '../../lib/colors';

/**
 * Planet component mapping a single repository to an orbiting WebGL sphere.
 * Handles orbital rotation, mouse interaction overlays, and state changes.
 */
export default function Planet({ planet }) {
  const { id, name, color, scale, orbit_radius, orbit_speed } = planet;

  const groupRef = useRef();
  const planetRef = useRef();

  const [hovered, setHovered] = useState(false);

  const dispatch = useDispatch();
  const selectedPlanet = useSelector((state) => state.universe.selectedPlanet);

  // Angle of rotation around the Sun (randomized start point)
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Tilted orbital plane inclination (randomized per planet using simple hash)
  const tiltRef = useRef(((id % 10) - 5) * (Math.PI / 180) * 1.5); // -7.5 to +7.5 degrees

  const isSelected = selectedPlanet?.id === id;
  const lineGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * orbit_radius, 0, Math.sin(theta) * orbit_radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [orbit_radius]);

  useFrame((state, delta) => {
    // 1. Revolve around the Sun
    // Multiply speed slightly for better visual feedback (not too slow)
    angleRef.current += orbit_speed * delta * 0.4;

    const x = orbit_radius * Math.cos(angleRef.current);
    const z = orbit_radius * Math.sin(angleRef.current);

    if (planetRef.current) {
      // Set planet position in the tilted group coordinates
      planetRef.current.position.set(x, 0, z);

      // Rotate planet on its own axis
      planetRef.current.rotation.y += delta * 0.8;

      // 2. Smoothly scale planet on hover / selection
      let targetSize = scale * 0.5; // base size modifier
      if (hovered) targetSize *= 1.25;
      if (isSelected) targetSize *= 1.35;

      const currentScale = planetRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetSize, 0.15);
      planetRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);
    }
  });

  return (
    // The group represents the tilted orbital plane
    <group
      ref={groupRef}
      rotation={[tiltRef.current, 0, tiltRef.current / 2]}
    >
      {/* 1. Thin Orbit Line Path */}
      <lineLoop geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.45 : 0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineLoop>

      {/* 2. Interactive Planet Sphere */}
      <mesh
        ref={planetRef}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedPlanet(planet));
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 0.8 : 0.15}
          roughness={0.3}
          metalness={0.8}
        />

        {/* 3. Sleek glowing aura circle around selected planet */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[1.3, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.25}
              wireframe
            />
          </mesh>
        )}

        {/* 4. HTML hover tooltip */}
        {hovered && (
          <Html
            distanceFactor={10}
            center
            className="pointer-events-none"
          >
            <div className="bg-[#050510]/95 border border-[#1b1b3a] px-3 py-1.5 rounded-lg text-xs font-mono text-white shadow-2xl flex items-center gap-2 whitespace-nowrap animate-fade-in backdrop-blur-md">
              <span
                className={`w-2.5 h-2.5 rounded-full inline-block lang-color-${getLangClassName(planet.language)} lang-dot`}
              />
              <span className="font-semibold text-gray-100">{name}</span>
              <span className="text-yellow-400">★ {planet.stars}</span>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}
