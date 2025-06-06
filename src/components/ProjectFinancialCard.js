import React from 'react';

const ProjectFinancialCard = ({ project, onClick }) => {
  // Cálculos de utilidades
  const totalExpense = project.monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);
  
  const profitBudget = ((project.budget - totalExpense) / project.budget) * 100;
  const profitGoal = ((project.salesGoal - totalExpense) / project.salesGoal) * 100;
  const currentProfit = project.invoiced > 0 
    ? ((project.invoiced - totalExpense) / project.invoiced) * 100 
    : 0;

  return (
    <div 
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500"
      onClick={() => onClick(project)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === "Completado" ? "bg-green-100 text-green-800" :
          project.status === "En progreso" ? "bg-yellow-100 text-yellow-800" :
          "bg-red-100 text-red-800"
        }`}>
          {project.status}
        </span>
      </div>

      {/* Sección Presupuestos */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3 border-b pb-1">Presupuestos</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Venta</p>
            <p className="font-medium">{project.currency} {project.budget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Meta</p>
            <p className="font-medium">{project.currency} {project.salesGoal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Adicionales</p>
            <p className="font-medium">{project.currency} {project.additional.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Reconocidos</p>
            <p className="font-medium">{project.currency} {project.recognized.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Sección Utilidades */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3 border-b pb-1">Utilidades</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Sobre Venta</p>
            <p className={`font-medium ${
              profitBudget >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {profitBudget.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sobre Meta</p>
            <p className={`font-medium ${
              profitGoal >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {profitGoal.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Sección Facturación */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3 border-b pb-1">Facturación</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Facturado</p>
            <p className="font-medium">{project.currency} {project.invoiced.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Utilidad Actual</p>
            <p className={`font-medium ${
              currentProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {currentProfit.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <span className="text-xs text-gray-500">
          Egreso total: {project.currency} {totalExpense.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ProjectFinancialCard;