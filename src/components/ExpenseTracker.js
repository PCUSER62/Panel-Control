import React, { useState, useEffect } from 'react';
import { 
  formatDate,
  parseDate,
  getCurrentDate,
  getFutureDate
} from '../utils/dateUtils';

const ExpenseTracker = ({ expenses = [], currency, onSave }) => {
  const [localExpenses, setLocalExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: getCurrentDate(),
    amount: '',
    description: '',
    currency: 'PEN',
    exchangeRate: 3.7
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setLocalExpenses(expenses.map(exp => ({
      ...exp,
      date: exp.date ? formatDate(exp.date) : getCurrentDate()
    })));
  }, [expenses]);

  const handleAddExpense = () => {
    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || !newExpense.date) return;

    const finalAmount = newExpense.currency === 'USD' 
      ? amount * newExpense.exchangeRate 
      : amount;

    if (editingId !== null) {
      const updated = localExpenses.map(exp => 
        exp.id === editingId 
          ? { ...exp, ...newExpense, amount: finalAmount } 
          : exp
      );
      setLocalExpenses(updated);
    } else {
      setLocalExpenses([...localExpenses, {
        ...newExpense,
        id: Date.now(),
        amount: finalAmount
      }]);
    }
    
    setNewExpense({
      date: getCurrentDate(),
      amount: '',
      description: '',
      currency: 'PEN',
      exchangeRate: 3.7
    });
    setEditingId(null);
  };

  const handleSave = () => {
    onSave(localExpenses);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Registro de Egresos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Fecha (dd/mm/yyyy)</label>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newExpense.date}
            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Monto</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Moneda</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newExpense.currency}
            onChange={(e) => setNewExpense({...newExpense, currency: e.target.value})}
          >
            <option value="PEN">Soles</option>
            <option value="USD">Dólares</option>
          </select>
        </div>
        {newExpense.currency === 'USD' && (
          <div>
            <label className="block text-sm text-gray-500 mb-1">Tasa de cambio</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={newExpense.exchangeRate}
              onChange={(e) => setNewExpense({...newExpense, exchangeRate: parseFloat(e.target.value)})}
            />
          </div>
        )}
        <div className="flex items-end">
          <button
            onClick={handleAddExpense}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editingId !== null ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto (PEN)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {localExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  S/ {expense.amount.toLocaleString('es-PE', {minimumFractionDigits: 2})}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setNewExpense({
                        date: expense.date,
                        amount: expense.amount,
                        description: expense.description,
                        currency: 'PEN',
                        exchangeRate: 3.7
                      });
                      setEditingId(expense.id);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setLocalExpenses(localExpenses.filter(e => e.id !== expense.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default ExpenseTracker;