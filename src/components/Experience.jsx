import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Litfass } from "./Litfass";

export const Experience = ({ onPosterClick }) => {
  // Ref for the OrbitControls
  const orbitRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.autoRotate = !isHovered;
      orbitRef.current.autoRotateSpeed = 1;
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
      <Litfass 
        onPosterClick={onPosterClick} 
        onHoverChange={setIsHovered}
      />
      <Environment preset="city" />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};
