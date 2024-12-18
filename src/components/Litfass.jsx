import React, { useState } from 'react';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useControls, folder } from 'leva';

const AnimatedDecal = animated(Decal);

export function Litfass({onPosterClick, ...props }) {
  const textures = [
    useTexture("/flyers/project1.png"),
    useTexture("/flyers/project2.png"),
    useTexture("/flyers/project3.png")
  ];
  const { nodes, materials } = useGLTF('/models/litfass.glb');
  const x = 1;
  const y = 1.1;
  const z = 1;
  const fac = 1.1;

  const controls = useControls({
    'Poster 1': folder({
      position1: { value: [0, -0.3, 1], step: 0.1 },
      rotation1: { value: [0, 0, 0], step: 0.1 },
    }),
    'Poster 2': folder({
      position2: { value: [0.9, 0.3, -0.5], step: 0.1 },
      rotation2: { value: [0, 2, 0], step: 0.1 },
    }),
    'Poster 3': folder({
      position3: { value: [-0.9, 0.6, -0.5], step: 0.1 },
      rotation3: { value: [0, -2.1, 0], step: 0.1 },
    }),
  });

  // const controls = useControls({
  //   'Poster 1': folder({
  //     position1: { value: [0, 0, 1], step: 0.1 },
  //     rotation1: { value: [0, 0, 0], step: 0.1 },
  //   }),
  //   'Poster 2': folder({
  //     position2: { value: [Math.sin(2*Math.PI/3), 0, Math.cos(2*Math.PI/3)], step: 0.1 },
  //     rotation2: { value: [0, -2*Math.PI/3, 0], step: 0.1 },
  //   }),
  //   'Poster 3': folder({
  //     position3: { value: [Math.sin(4*Math.PI/3), 0, Math.cos(4*Math.PI/3)], step: 0.1 },
  //     rotation3: { value: [0, -4*Math.PI/3, 0], step: 0.1 },
  //   }),
  // });

  // Create separate springs for each poster
  const [springs, setSprings] = useState(
    textures.map(() => 
      useSpring(() => ({
        scale: [x, y, z],
        config: {
          mass: 0.1,
          friction: 10,
        }
      }))
    )
  );

  const handleClickEvent = (index) => () => {
    const newSprings = [...springs];
    newSprings[index][1].start({
      scale: [2.25, 2.475, 2.7],
    });
    onPosterClick(`This is the detailed information for Project ${index + 1}.`);
  }

  const handlePointerEnter = (index) => () => {
    const newSprings = [...springs];
    newSprings[index][1].start({
      scale: [x * fac, y * fac, z * fac],
    });
  }

  const handlePointerLeave = (index) => () => {
    const newSprings = [...springs];
    newSprings[index][1].start({
      scale: [x, y, z],
    });
  }

  const getPosterProperties = (index) => {
    switch (index) {
      case 0:
        return {
          position: controls.position1,
          rotation: controls.rotation1
        };
      case 1:
        return {
          position: controls.position2,
          rotation: controls.rotation2
        };
      case 2:
        return {
          position: controls.position3,
          rotation: controls.rotation3
        };
      default:
        return {
          position: [0, 0, 0],
          rotation: [0, 0, 0]
        };
    }
  }

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder006.geometry} material={materials['Litfass_Material.001']} />
      <mesh geometry={nodes.Cylinder006_1.geometry}>
        <meshBasicMaterial transparent opacity={0} />
        {textures.map((texture, index) => {
          const { position, rotation } = getPosterProperties(index);
          const [spring] = springs[index];
          return (
            <AnimatedDecal
              debug
              key={index}
              position={position}
              rotation={rotation}
              scale={spring.scale}
              onPointerEnter={handlePointerEnter(index)}
              onPointerLeave={handlePointerLeave(index)}
              onClick={handleClickEvent(index)}
            >
              <meshStandardMaterial
                map={texture}
                polygonOffset
                polygonOffsetFactor={-1}
              />
            </AnimatedDecal>
          );
        })}
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/litfass.glb');