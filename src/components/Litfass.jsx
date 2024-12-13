import React, { useState } from 'react';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useSpring } from '@react-spring/three';

export function Litfass({ onPosterClick, ...props }) {
  const texture = useTexture("/flyers/project1.png");
  const { nodes, materials } = useGLTF('/models/litfass.glb');
  const [isHovered, setIsHovered] = useState(false);

  // Spring animation for hover effect
  const { scale } = useSpring({
    from: { scale: [1, 1, 1.2] },
    to: { scale: isHovered ? 1.2 : 1 },
    config: { tension: 300, friction: 15 }
  });

  const handleClickEvent = () => {
    onPosterClick("This is the detailed information for Project 1.");
  };

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder006.geometry} material={materials['Litfass_Material.001']} />
      <mesh 
        geometry={nodes.Cylinder006_1.geometry}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={handleClickEvent}
      >
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          position={[0, 0, 0.51]}
          rotation={[0, 0, 0]}
          scale={[
            0.3 * scale.to(v => v), 
            0.3 * scale.to(v => v), 
            0.3 * scale.to(v => v)
          ]}
        >
          <meshStandardMaterial
            map={texture}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/litfass.glb');