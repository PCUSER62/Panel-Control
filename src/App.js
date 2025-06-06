import React, { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import NewProjectForm from './components/NewProjectForm';
import projectsData from './mock/projects';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
    setShowNewProjectForm(false);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    setSelectedProject(updatedProject);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-800">PANEK</h1>
          <h2 className="text-2xl font-semibold text-blue-600">Control de Proyectos y Servicios</h2>
        </header>

        {!selectedProject && !showNewProjectForm ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Panel de Control</h2>
              <button
                onClick={() => setShowNewProjectForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Nuevo Proyecto
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => setSelectedProject(project)} 
                />
              ))}
            </div>
          </div>
        ) : showNewProjectForm ? (
          <NewProjectForm 
            onSave={handleAddProject}
            onCancel={() => setShowNewProjectForm(false)}
          />
        ) : (
          <ProjectDetail 
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            onUpdate={handleUpdateProject}
          />
        )}
      </div>
    </div>
  );
};

export default App;

// DONE