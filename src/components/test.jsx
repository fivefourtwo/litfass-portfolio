import React, { useRef, useState } from 'react';
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Poster = ({ texture, position, project, onProjectSelect }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={() => onProjectSelect(project)}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export const Litfass = ({ projects, onProjectSelect }) => {
  const { scene } = useGLTF("/models/litfass.glb");
  
  // Load poster textures
  const posterTextures = projects.map(project => 
    useTexture(project.image)
  );

  return (
    <>
      <primitive object={scene} />
      
      {/* Position posters around the column */}
      {posterTextures.map((texture, index) => (
        <Poster 
          key={index}
          texture={texture}
          project={projects[index]}
          position={[
            Math.cos(index * (Math.PI * 2 / projects.length)) * 2,
            Math.sin(index * (Math.PI * 2 / projects.length)) * 2,
            0.5
          ]}
          onProjectSelect={onProjectSelect}
        />
      ))}
    </>
  );
};

useGLTF.preload("/litfass.glb");