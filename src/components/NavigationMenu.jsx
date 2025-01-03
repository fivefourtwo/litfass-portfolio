import React, { useState } from 'react';

const NavigationMenu = ({ onNavigate, activeItem }) => {
  const [expandedSections, setExpandedSections] = useState({
    projects: true,
    contact: false
  });

  const projects = [
    { id: 0, title: "AccessAbility" },
    { id: 1, title: "Project 02" },
    { id: 2, title: "Project 03" },
    { id: 3, title: "Project 04" },
    { id: 4, title: "Project 05" },
    { id: 5, title: "Project 06" },
    { id: 6, title: "Project 07" },
    { id: 7, title: "Project 08" }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200">
      <nav className="space-y-4">
        {/* Projects Section */}
        <div>
          <button 
            onClick={() => toggleSection('projects')}
            className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
          >
            <span className="mr-2">{expandedSections.projects ? '▼' : '▶'}</span>
            Projects
          </button>
          
          {expandedSections.projects && (
            <div className="ml-4 space-y-2">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => onNavigate(project.id)}
                  className={`w-full p-2 text-left rounded hover:bg-gray-100 ${
                    activeItem === project.id ? 'bg-gray-100 font-medium' : ''
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div>
          <button 
            onClick={() => toggleSection('contact')}
            className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
          >
            <span className="mr-2">{expandedSections.contact ? '▼' : '▶'}</span>
            Contact
          </button>
          
          {expandedSections.contact && (
            <div className="ml-4 space-y-2">
              <a href="mailto:contact@example.com" className="block p-2 hover:bg-gray-100 rounded">
                Email
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block p-2 hover:bg-gray-100 rounded">
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavigationMenu;