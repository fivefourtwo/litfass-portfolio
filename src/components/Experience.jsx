import React, { useState } from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Litfass } from "./Litfass";

export const Experience = ({ onProjectSelect }) => {
  // Your project data
  const projects = [
    {
      id: 1,
      title: 'Interactive Data Visualization',
      image: '/flyers/project1.png', // Replace with your actual poster image path
      description: 'A comprehensive data visualization project using modern web technologies.',
      technologies: ['React', 'D3.js', 'TypeScript']
    },
    {
      id: 2,
      title: 'Portfolio Website',
      image: '/flyers/project2.png', // Replace with your actual poster image path
      description: 'A modern, responsive portfolio showcasing my web development projects.',
      technologies: ['React', 'Three.js', 'Tailwind CSS']
    },
    // Add more projects as needed
  ];

  return (
    <>
      <OrbitControls 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 1.5}
        minDistance={3}
        maxDistance={10}
      />
      <Litfass 
        projects={projects}
        onProjectSelect={onProjectSelect}
      />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};