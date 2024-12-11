<Decal
  position={position || [0, 0, 0]} // Fallback zu einem gültigen Wert
  scale={scale || [1, 1, 1]} // Fallback für Skalierung
  rotation={[0, 0, 0]} 
  onPointerEnter={() => setHovered(true)} 
  onPointerLeave={() => setHovered(false)}
>
  <meshStandardMaterial
    map={texture}
    polygonOffset
    polygonOffsetFactor={-1}
  />
</Decal>
