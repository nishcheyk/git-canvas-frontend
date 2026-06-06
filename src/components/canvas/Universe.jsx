import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import StarField from './StarField';
import Nebula from './Nebula';

/**
 * Main WebGL universe rendering engine.
 * Sets up the Canvas, lights, mouse orbit controls, starfield, nebulae, and lists repo planets.
 */
export default function Universe({ planets = [] }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 10, 22], fov: 60 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        {/* Core background color */}
        <color attach="background" args={['#050510']} />

        {/* Ambient illumination for materials */}
        <ambientLight intensity={0.15} />

        {/* Dynamic WebGL Star field */}
        <StarField count={1000} />

        {/* Volumetric language nebula backdrops */}
        <Nebula />

        {/* Center glowing Sun core (Avatar) */}
        <Sun />

        {/* Render orbiting planet nodes */}
        {planets.map((planet) => (
          <Planet key={planet.id} planet={planet} />
        ))}

        {/* Camera interaction orbital limits */}
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.05}
          maxDistance={42}
          minDistance={4}
          makeDefault={true}
        />
      </Canvas>
    </div>
  );
}
