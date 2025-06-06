import React from 'react';

const FinanceChart = ({ project }) => {
  const targetProfit = project.salesGoal - project.budget;
  const currentProfit = project.income - project.egress;
  const profitPercentage = Math.min(100, (currentProfit / targetProfit) * 100);
  const egressPercentage = Math.min(100, (project.egress / project.budget) * 100);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Análisis Financiero</h3>
      <div className="relative w-full h-64 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          {/* Fondo del gráfico */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="16"
          />
          {/* Segmento de Egresos */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#EF4444"
            strokeWidth="16"
            strokeDasharray={`${egressPercentage} 100`}
            strokeLinecap="round"
          />
          {/* Segmento de Utilidad */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#10B981"
            strokeWidth="16"
            strokeDasharray={`${profitPercentage} 100`}
            strokeDashoffset={`-${egressPercentage}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-gray-800">
            {project.currency === 'USD' ? '$' : 'S/.'} 
            {currentProfit.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Utilidad Actual</p>
        </div>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Utilidad ({profitPercentage.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm">Egresos ({egressPercentage.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;