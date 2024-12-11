import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import ProjectPopup from './components/ProjectPopup';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Experience onProjectSelect={setSelectedProject} />
      </Canvas>

      {selectedProject && (
        <ProjectPopup 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}

export default App;