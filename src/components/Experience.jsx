import { Grid, Environment, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Litfass } from "./Litfass";

export const Experience = ({ onPosterClick }) => {
  // Ref for the OrbitControls
  const orbitRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Grid controls using leva
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 0.1, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 0.4, min: 0, max: 5, step: 0.1 },
    cellColor: "#A4A4A4",
    sectionSize: { value: 1, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 0.7, min: 0, max: 5, step: 0.1 },
    sectionColor: "#727272",
    fadeDistance: { value: 32, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  });

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.target.set(3, 0, 0);
      orbitRef.current.update();
      orbitRef.current.autoRotate = !isHovered;
      orbitRef.current.autoRotateSpeed = -1;
    }
  });

  return (
    <>
      <OrbitControls
        ref={orbitRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={1.3}
        maxPolarAngle={1.3}
      />
      <group position={[3, 0, 0]}>
      <Litfass onPosterClick={onPosterClick} onHoverChange={setIsHovered} />
      </group>
      <Grid position={[0, -2, 0]} args={gridSize} {...gridConfig} />
      <Environment preset="city" />
    </>
  );
};
