import React, { useState } from 'react';
import ExpenseTracker from './ExpenseTracker';
import ProgressTimeline from './ProgressTimeline';
import FinancialAlert from './FinancialAlert';
import { formatDate, getCurrentDate } from '../utils/dateUtils';

const ProjectDetail = ({ project, onBack, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('financial');

  const handleUpdateExpenses = (expenses) => {
    onUpdate({
      ...project,
      monthlyExpenses: expenses
    });
  };

  const handleUpdateProgress = (actualTimeline) => {
    onUpdate({
      ...project,
      progressTimeline: actualTimeline
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{project.name}</h2>
            <p className="text-gray-600 mt-1">
              Responsable: {project.responsible} | Director: {project.director}
            </p>
          </div>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver
          </button>
        </div>

        <FinancialAlert 
          budget={project.budget} 
          goal={project.salesGoal} 
          expenses={project.monthlyExpenses} 
          invoiced={project.invoiced} 
        />

        <div className="flex border-b mt-4">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'financial' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('financial')}
          >
            Seguimiento Financiero
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'progress' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('progress')}
          >
            Avance del Proyecto
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'financial' ? (
          <ExpenseTracker
            expenses={project.monthlyExpenses}
            currency={project.currency}
            onSave={handleUpdateExpenses}
          />
        ) : (
          <ProgressTimeline
            startDate={project.startDate || getCurrentDate()}
            endDate={project.endDate || getCurrentDate()}
            projectedTimeline={project.projectedTimeline || []}
            actualTimeline={project.progressTimeline || []}
            onSave={handleUpdateProgress}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

// DONE