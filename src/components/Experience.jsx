import { Grid, Environment, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls, Leva } from "leva";
import { Litfass } from "./Litfass";
import gsap from "gsap";
import * as THREE from 'three';

export const Experience = () => {
  const orbitRef = useRef();
  const litfassGroupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { camera } = useThree();

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
    if (orbitRef.current && !isAnimating) {
      orbitRef.current.target.set(3, 0, 0);
      orbitRef.current.update();
      orbitRef.current.autoRotate = !isHovered;
      orbitRef.current.autoRotateSpeed = -1;
    }
  });

  const handlePosterClick = (posterRotation, posterPosition) => {
    setIsAnimating(true);
    
    if (orbitRef.current) {
      orbitRef.current.enabled = false;
    }

    // Calculate the target position based on the poster's position and rotation
    const targetPosition = new THREE.Vector3(...posterPosition);
    const distance = 2; // Distance from the poster
    
    // Calculate the camera position in front of the poster
    const angle = -posterRotation[1]; // Negative because we want to face the poster
    const cameraX = targetPosition.x + Math.sin(angle) * distance;
    const cameraZ = targetPosition.z + Math.cos(angle) * distance;

    const timeline = gsap.timeline({
      onComplete: () => {
        if (orbitRef.current) {
          orbitRef.current.enabled = true;
          orbitRef.current.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
        }
        setIsAnimating(false);
      }
    });

    // First, rotate the Litfass group
    timeline.to(litfassGroupRef.current.rotation, {
      y: -posterRotation[1],
      duration: 1,
      ease: "power2.inOut"
    });

    // Then, move the camera and update its target
    timeline.to(camera.position, {
      x: cameraX,
      y: targetPosition.y,
      z: cameraZ,
      duration: 1,
      ease: "power2.inOut"
    }, "+=0.1");

    // Update the orbit controls target
    timeline.to(orbitRef.current.target, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1");
  };

  return (
    <>
      <OrbitControls
        ref={orbitRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={1.3}
        maxPolarAngle={1.3}
      />
      <group position={[3, 0, 0]} ref={litfassGroupRef}>
        <Litfass 
          onPosterClick={handlePosterClick} 
          onHoverChange={setIsHovered} 
        />
      </group>
      <Grid position={[0, -2, 0]} args={gridSize} {...gridConfig} />
      <Environment preset="city" />
    </>
  );
}