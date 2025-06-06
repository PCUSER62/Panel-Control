import React, { useEffect, useState } from 'react';

const FinancialAlert = ({ budget, goal, expenses, invoiced }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('warning');

  useEffect(() => {
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    
    // Check profit against budget
    const budgetProfitPercentage = ((budget - totalExpense) / budget) * 100;
    const goalProfitPercentage = ((goal - totalExpense) / goal) * 100;
    const actualProfitPercentage = invoiced > 0 
      ? ((invoiced - totalExpense) / invoiced) * 100 
      : 0;

    if (actualProfitPercentage < budgetProfitPercentage * 0.85) {
      setAlertMessage(`Alerta: La utilidad actual (${actualProfitPercentage.toFixed(1)}%) está por debajo del objetivo presupuestado (${budgetProfitPercentage.toFixed(1)}%)`);
      setAlertType('danger');
      setShowAlert(true);
    } else if (goalProfitPercentage > 0 && actualProfitPercentage < goalProfitPercentage * 0.85) {
      setAlertMessage(`Advertencia: La utilidad actual (${actualProfitPercentage.toFixed(1)}%) está por debajo de la meta (${goalProfitPercentage.toFixed(1)}%)`);
      setAlertType('warning');
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [budget, goal, expenses, invoiced]);

  if (!showAlert) return null;

  return (
    <div className={`mb-6 p-4 rounded-lg border-l-4 ${
      alertType === 'danger' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
    }`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${
          alertType === 'danger' ? 'text-red-500' : 'text-yellow-500'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${
            alertType === 'danger' ? 'text-red-800' : 'text-yellow-800'
          }`}>
            {alertMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialAlert;