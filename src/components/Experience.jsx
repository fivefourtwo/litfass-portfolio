import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import {Litfass} from "./Litfass";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Litfass />
      <Environment preset="city" />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};
