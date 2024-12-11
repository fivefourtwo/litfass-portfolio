import React from 'react';

export default function ProjectPopup({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full mb-4 rounded-md shadow-md"
        />
        <p className="mb-4">{project.description}</p>
        {project.technologies && (
          <div>
            <strong className="block mb-2">Technologies:</strong>
            <ul className="list-disc pl-5">
              {project.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}