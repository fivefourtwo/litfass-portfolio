/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/litfass.glb -o src/components/Litfass.jsx -r public 
*/

import React, { useEffect } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

export function Litfass(props) {
    const texture = useTexture("/flyers/project1.png");
    const { nodes, materials } = useGLTF("/models/litfass.glb");

    const initialScale = 1;
    const hoveredScale = 1.5;

    // const scale = React.useRef(1.5);

    const decalRef = React.useRef();

    const animateScale = (target) => {
        console.log("hover changed. Target: ", decalRef.current.scale.x);

        if (decalRef.current) {
            const animationDuration = 200;
            const animationFrames = 30;
            const animationInterval = animationDuration / animationFrames;
            const delta = target - decalRef.current.scale.x;

            const animationStartScale = delta > 0 ? initialScale : hoveredScale;
            const direction = delta > 0 ? 1 : -1;
            const animationStep = (direction * animationStartScale) / animationFrames;

            console.log(delta);

            //cancel the animation if the difference is less than 0.01
            if (Math.abs(delta) <= animationStep / 1.2) {
                decalRef.current.scale.set(target, target, target);
                console.log("animation cancelled");
                return;
            }

            const changedScale = decalRef.current.scale.x + animationStep;

            //recursive, so the animation continues until the target is reached
            setTimeout(() => {
                requestAnimationFrame(() => {
                    decalRef.current.scale.set(changedScale, changedScale, changedScale);
                    animateScale(target);
                });
            }, animationInterval);
        }
    };

    useEffect(() => {
        if (decalRef.current) {
            console.log("scale: ", decalRef.current.scale);
        }
    }, []);

    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Cylinder006.geometry} material={materials["Litfass_Material.001"]} />
            <mesh geometry={nodes.Cylinder006_1.geometry}>
                <meshBasicMaterial transparent opacity={0} />
                <Decal
                    ref={decalRef}
                    // debug // Makes "bounding box" of the decal visible
                    position={[0, 1.8, 1]} // Position of the decal
                    rotation={[0, 0, 0]} // Rotation of the decal (can be a vector or a degree in radians)
                    scale={initialScale} // Scale of the decal
                    onPointerEnter={(e) => {
                        console.log("pointerEnter");
                        animateScale(hoveredScale);
                    }}
                    onPointerLeave={(e) => {
                        console.log("pointerLeave");
                        animateScale(initialScale);
                    }}
                >
                    <meshStandardMaterial
                        map={texture}
                        polygonOffset
                        polygonOffsetFactor={-1} // The mesh should take precedence over the original
                    />
                </Decal>
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/litfass.glb");
