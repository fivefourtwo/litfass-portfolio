import React, { useRef, useMemo } from 'react';
import { useGLTF, useTexture } from "@react-three/drei";
import { Vector3, Mesh } from 'three';
import * as THREE from 'three';

const Poster = ({ texture, position, project, onProjectSelect }) => {
  const meshRef = useRef();

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onProjectSelect(project)}
    >
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export const Litfass = ({ projects, onProjectSelect }) => {
  const { scene } = useGLTF("/models/litfass.glb");
  const decalTextures = projects.map(project => useTexture(project.image));

  // Create decal geometry
  const decals = useMemo(() => {
    return decalTextures.map((texture, index) => {
      const decal = {
        position: new THREE.Vector3(
          Math.cos(index * (Math.PI * 2 / projects.length)) * 1.5,
          Math.sin(index * (Math.PI * 2 / projects.length)) * 1.5,
          0.01
        ),
        rotation: new THREE.Euler(
          -Math.PI / 2,
          0,
          index * (Math.PI * 2 / projects.length)
        ),
        texture: texture
      };
      return decal;
    });
  }, [decalTextures, projects]);

  return (
    <>
      <primitive object={scene} />
      {decals.map((decal, index) => (
        <primitive
          key={index}
          object={decal}
          position={decal.position}
          rotation={decal.rotation}
          onClick={() => onProjectSelect(projects[index])}
        />
      ))}
    </>
  );
};

useGLTF.preload("/models/litfass.glb");