import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import {Litfass} from "./Litfass";

export const Experience = () => {
  return (
    <>
      <OrbitControls 
      enableZoom={false}
      enablePan={false}
      minPolarAngle={1.3}
      maxPolarAngle={1.3}
      />
      <Litfass />
      <Environment preset="city" />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};
