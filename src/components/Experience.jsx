import { Grid, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { Litfass } from "./Litfass";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

export const Experience = () => {
  const orbitRef = useRef();
  const cameraRef = useRef();
  const objectRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  // Animation settings
  const ANIMATION_SETTINGS = {
    spring: {
      tension: 80,     // Controls the animation speed (higher = faster)
      friction: 50,     // Controls the smoothing (higher = more damping)
      mass: 1,         // Affects momentum (higher = more inertia)
      duration: 1000,  // Optional: Set exact duration in milliseconds
      bounce: 0        // Optional: Add bounce effect (0-1)
    },
    camera: {
      lerpFactor: 0.1  // Controls camera smoothing (0-1, higher = faster)
    }
  };

  const CAMERA_SETTINGS = {
    default: {
      position: [0, 0, 7],
      target: [0, 0, 0],
      fov: 45
    },
    zoomed: {
      distance: 1,
      targetOffset: 0.4,
      fov: 45
    },
    controls: {
      minDistance: 2,
      maxDistance: 10,
      minPolarAngle: 1.3,
      maxPolarAngle: 1.3,
      autoRotateSpeed: 0.7
    }
  };

  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 0.1, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 0.4, min: 0, max: 5, step: 0.1 },
    cellColor: "#A4A4A4",
    sectionSize: { value: 1, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 0.7, min: 0, max: 5, step: 0.1 },
    sectionColor: "#727272",
    fadeDistance: { value: 32, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  });

  const [{ cameraPosition, orbitTarget, objectRotation }, api] = useSpring(() => ({
    cameraPosition: CAMERA_SETTINGS.default.position,
    orbitTarget: CAMERA_SETTINGS.default.target,
    objectRotation: [0, 0, 0],
    config: {
      // Using spring physics
      tension: ANIMATION_SETTINGS.spring.tension,
      friction: ANIMATION_SETTINGS.spring.friction,
      mass: ANIMATION_SETTINGS.spring.mass,
      // Optional: use duration instead of spring physics
      // duration: ANIMATION_SETTINGS.spring.duration,
      // bounce: ANIMATION_SETTINGS.spring.bounce,
    },
    onChange: () => {
      setIsAnimating(true);
    },
    onRest: () => {
      setIsAnimating(false);
    }
  }));

  const handlePosterClick = (content) => {
    const posterPosition = new Vector3(...content.position);
    const posterRotationY = content.rotation[1];
    
    if (!isZoomedIn) {
      // Zoom in with offset target
      api.start({
        to: {
          cameraPosition: [
            CAMERA_SETTINGS.zoomed.targetOffset, // Match camera x-position to target offset
            posterPosition.y, 
            CAMERA_SETTINGS.zoomed.distance
          ],
          orbitTarget: [
            CAMERA_SETTINGS.zoomed.targetOffset, // Offset the look-at point
            posterPosition.y, 
            0
          ],
          objectRotation: [0, -posterRotationY, 0],
        },
        config: {
          tension: ANIMATION_SETTINGS.spring.tension,
          friction: ANIMATION_SETTINGS.spring.friction,
        }
      });
      setIsZoomedIn(true);
    } else {
      // Reset to default view with possibly different animation settings
      api.start({
        to: {
          cameraPosition: CAMERA_SETTINGS.default.position,
          orbitTarget: CAMERA_SETTINGS.default.target,
          objectRotation: [0, 0, 0],
        },
        config: {
          // You can use different settings for zooming out
          tension: ANIMATION_SETTINGS.spring.tension * 0.8, // slower zoom-out
          friction: ANIMATION_SETTINGS.spring.friction,
          // or use duration
          // duration: 1200, // slower zoom-out
        }
      });
      setIsZoomedIn(false);
    }
  };

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.autoRotate = true;
      orbitRef.current.autoRotateSpeed = CAMERA_SETTINGS.controls.autoRotateSpeed;
      orbitRef.current.enableDamping = true;
      orbitRef.current.dampingFactor = 0.05;
    }
  }, []);

  useFrame(() => {
    if (orbitRef.current && cameraRef.current) {
      if (isAnimating) {
        const target = orbitTarget.get();
        const cameraPos = new Vector3(...cameraPosition.get());
        
        // Adjust lerp factor to control camera smoothing speed
        cameraRef.current.position.lerp(cameraPos, ANIMATION_SETTINGS.camera.lerpFactor);
        orbitRef.current.target.set(target[0], target[1], target[2]);
      }

      orbitRef.current.autoRotate = !isHovered && !isAnimating && !isZoomedIn;
      orbitRef.current.update();
    }
  });

  return (
    <>
      <AnimatedPerspectiveCamera 
        ref={cameraRef} 
        makeDefault 
        position={[0, 0, 7]}
        fov={isZoomedIn ? CAMERA_SETTINGS.zoomed.fov : CAMERA_SETTINGS.default.fov}
      />

      <OrbitControls
        ref={orbitRef}
        enableZoom
        enablePan={false}
        minDistance={CAMERA_SETTINGS.controls.minDistance}
        maxDistance={CAMERA_SETTINGS.controls.maxDistance}
        minPolarAngle={CAMERA_SETTINGS.controls.minPolarAngle}
        maxPolarAngle={CAMERA_SETTINGS.controls.maxPolarAngle}
      />

      <animated.group
        ref={objectRef}
        rotation={objectRotation.to((x, y, z) => [x, y, z])}
        position={[0, 0, 0]}
      >
        <Litfass onPosterClick={handlePosterClick} onHoverChange={setIsHovered} />
      </animated.group>
        
      <Grid position={[0, -2, 0]} args={gridSize} {...gridConfig} />
      <Environment preset="city" />
    </>
  );
};