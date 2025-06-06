import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  const statusColor = {
    "Completado": "bg-green-100 text-green-800",
    "En progreso": "bg-yellow-100 text-yellow-800",
    "Atrasado": "bg-red-100 text-red-800",
    "Planificado": "bg-blue-100 text-blue-800"
  };

  return (
    <div 
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(project)}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[project.status] || 'bg-gray-100'}`}>
          {project.status}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progreso</span>
          <span className="text-sm font-medium">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <p className="text-xs text-gray-500">Presupuesto</p>
          <p className="text-sm font-medium">
            {project.currency === 'USD' ? '$' : 'S/.'} 
            {Number(project.budget || 0).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Utilidad</p>
          <p className="text-sm font-medium text-green-600">
            {typeof project.utility === 'number'
              ? project.utility.toFixed(2) + '%'
              : '0.00%'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
