import React, { useState } from 'react';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const AnimatedDecal = animated(Decal);

export function Litfass({onPosterClick, ...props }) {
  const texture = useTexture("/flyers/project1.png");
  const { nodes, materials } = useGLTF('/models/litfass.glb');
  const x = 1;
  const y = 1.1;
  const z = 1;
  const fac = 1.1;

  // Spring animation for hover effect
  const [springs, api] = useSpring(() => ({
    scale: [x, y, z],
    config: {
      mass: 0.1,
      friction: 10,
    }
  }), []);

  const handleClickEvent = () => {
    api.start({
      scale: [2.25, 2.475, 2.7],
    });
    onPosterClick("This is the detailed information for Project 1.");
  }

  const handlePointerEnter = () => {
    api.start({
      scale: [x * fac, y * fac, z * fac],
    });
  }

  const handlePointerLeave = () => {
    api.start({
      scale: [x, y, z],
    });
  }

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder006.geometry} material={materials['Litfass_Material.001']} />
      <mesh geometry={nodes.Cylinder006_1.geometry}>
        <meshBasicMaterial transparent opacity={0} />
        <AnimatedDecal
          // debug
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClickEvent}
          position={[0, 0, 1]}
          rotation={[0, 0, 0]}
          scale={springs.scale}
        >
          <meshStandardMaterial
            map={texture}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </AnimatedDecal>
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/litfass.glb');