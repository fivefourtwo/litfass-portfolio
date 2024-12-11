import React, { useState, useRef, useEffect } from 'react';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

export function Litfass(props) {
  const texture = useTexture("/flyers/project1.png");
  const { nodes, materials } = useGLTF('/models/litfass.glb');

  // Zustand für die Skalierung und Position des Decals
  const [scale, setScale] = useState([1, 1.2, 1]); // Anfangsskala
  const [position, setPosition] = useState([0, 1.8, 1]); // Anfangsposition
  const decalRef = useRef();

  // Handler für Hover-Effekte
  const handlePointerEnter = () => {
    setScale([1.5, 1.7, 1.5]); // Größere Skalierung beim Hover
    setPosition([0, 1.8 - 0.5, 1]); // Position leicht nach unten verschieben
  };

  const handlePointerLeave = () => {
    setScale([1, 1.2, 1]); // Zurück zur ursprünglichen Skalierung
    setPosition([0, 1.8, 1]); // Zurück zur ursprünglichen Position
  };

  // Effekt, um Skalierung und Position des Decals zu aktualisieren
  useEffect(() => {
    if (decalRef.current) {
      decalRef.current.scale.set(...scale); // Setzt die neue Skalierung
    }
  }, [scale]);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder006.geometry} material={materials['Litfass_Material.001']} />
      <mesh geometry={nodes.Cylinder006_1.geometry}>
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          ref={decalRef}
          position={position} // Dynamische Position
          rotation={[0, 0, 0]} // Rotation des Decals
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
