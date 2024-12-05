import React, { useState, useRef, useEffect } from 'react';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

export function Litfass(props) {
  const texture = useTexture("/flyers/project1.png");
  const { nodes, materials } = useGLTF('/models/litfass.glb');

  // Zustand für die Skalierung des Dekals
  const [scale, setScale] = useState([1, 1.2, 1]); // Anfangsskala
  const decalRef = useRef();

  // Handler für Hover-Effekte
  const handlePointerEnter = () => setScale([1.8, 2, 1.8]); // Skalierung beim Hover
  const handlePointerLeave = () => setScale([1, 1.2, 1]); // Skalierung nach dem Verlassen des Hovers

  // Effekt, um die Skalierung des Dekals zu aktualisieren
  useEffect(() => {
    if (decalRef.current) {
      decalRef.current.scale.set(...scale); // Setzt die neue Skalierung des Dekals
    }
  }, [scale]);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder006.geometry} material={materials['Litfass_Material.001']} />
      <mesh geometry={nodes.Cylinder006_1.geometry}>
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          ref={decalRef}
          position={[0, 1.8, 1]} // Position des Dekals
          rotation={[0, 0, 0]} // Rotation des Dekals
          scale={scale} // Dynamische Skalierung basierend auf dem Zustand
          onPointerEnter={handlePointerEnter} // Hover einleiten
          onPointerLeave={handlePointerLeave} // Hover beenden
        >
          <meshStandardMaterial
            map={texture}
            polygonOffset
            polygonOffsetFactor={-1} // Priorisiert das Dekal über die ursprüngliche Geometrie
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/litfass.glb');
