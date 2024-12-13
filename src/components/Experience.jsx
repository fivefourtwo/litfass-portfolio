import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import {Litfass} from "./Litfass";

export const Experience = ({ onPosterClick }) => {
  return (
    <>
      <OrbitControls 
      enableZoom={false}
      enablePan={false}
      minPolarAngle={1.3}
      maxPolarAngle={1.3}
      />
      <Litfass onPosterClick={onPosterClick} />
      <Environment preset="city" />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};
