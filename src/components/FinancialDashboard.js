import React from 'react';

const FinancialDashboard = ({ project }) => {
  const totalExpenses = project.monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetProfit = project.budget - totalExpenses;
  const goalProfit = project.salesGoal - totalExpenses;
  const currentProfit = project.invoiced - totalExpenses;

  const budgetProfitPercentage = (budgetProfit / project.budget) * 100;
  const goalProfitPercentage = (goalProfit / project.salesGoal) * 100;
  const currentProfitPercentage = project.invoiced > 0 
    ? (currentProfit / project.invoiced) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Resumen Financiero</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Presupuesto Venta</p>
            <p className="text-xl font-bold">
              {project.currency === 'USD' ? '$' : 'S/'} 
              {project.budget.toLocaleString('es-PE')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Presupuesto Meta</p>
            <p className="text-xl font-bold">
              {project.currency === 'USD' ? '$' : 'S/'} 
              {project.salesGoal.toLocaleString('es-PE')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Egresos Totales</p>
            <p className="text-xl font-bold">
              {project.currency === 'USD' ? '$' : 'S/'} 
              {totalExpenses.toLocaleString('es-PE')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Utilidades</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Sobre Presupuesto</p>
            <p className={`text-xl font-bold ${
              budgetProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {project.currency === 'USD' ? '$' : 'S/'} 
              {budgetProfit.toLocaleString('es-PE')} ({budgetProfitPercentage.toFixed(1)}%)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sobre Meta</p>
            <p className={`text-xl font-bold ${
              goalProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {project.currency === 'USD' ? '$' : 'S/'} 
              {goalProfit.toLocaleString('es-PE')} ({goalProfitPercentage.toFixed(1)}%)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Actual</p>
            <p className={`text-xl font-bold ${
              currentProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {project.currency === 'USD' ? '$' : 'S/'} 
              {currentProfit.toLocaleString('es-PE')} ({currentProfitPercentage.toFixed(1)}%)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Facturación</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Facturado</p>
            <p className="text-xl font-bold">
              {project.currency === 'USD' ? '$' : 'S/'} 
              {project.invoiced.toLocaleString('es-PE')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Adicionales</p>
            <p className="text-xl font-bold">
              {project.currency === 'USD' ? '$' : 'S/'} 
              {project.additional.toLocaleString('es-PE')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Reconocidos</p>
            <p className="text-xl font-bold">
              {project.currency === 'USD' ? '$' : 'S/'} 
              {project.recognized.toLocaleString('es-PE')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;