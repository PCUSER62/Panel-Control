import React, { useState, useEffect } from 'react';
import { formatDate, parseDate, addDays, addWeeks, isBefore, getCurrentDate } from '../utils/dateUtils';

const ProgressTimeline = ({ 
  startDate = getCurrentDate(), 
  endDate = getCurrentDate(), 
  projectedTimeline = [], 
  actualTimeline = [], 
  onSave 
}) => {
  const [weeks, setWeeks] = useState([]);
  const [editingWeek, setEditingWeek] = useState(null);
  const [progressValue, setProgressValue] = useState('');

  useEffect(() => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const weeksCount = Math.ceil((end - start) / (7 * 24 * 60 * 60 * 1000));
    
    const generatedWeeks = Array.from({ length: weeksCount }, (_, i) => {
      const weekStart = addWeeks(start, i);
      const weekEnd = addDays(weekStart, 6);
      const weekKey = `${formatDate(weekStart).substr(0, 5)}-${formatDate(weekEnd).substr(0, 5)}`;
      
      const projected = projectedTimeline.find(p => p.week === i+1)?.value || 0;
      const actual = actualTimeline.find(a => a.week === i+1)?.value || null;
      
      return {
        week: i+1,
        startDate: formatDate(weekStart),
        endDate: formatDate(weekEnd),
        weekKey,
        projected,
        actual
      };
    });

    setWeeks(generatedWeeks);
  }, [startDate, endDate, projectedTimeline, actualTimeline]);

  const handleSaveProgress = () => {
    if (editingWeek === null || progressValue === '') return;

    const updatedWeeks = weeks.map(w => 
      w.week === editingWeek 
        ? { ...w, actual: parseFloat(progressValue) } 
        : w
    );
    
    const updatedActualTimeline = updatedWeeks
      .filter(w => w.actual !== null)
      .map(w => ({ week: w.week, value: w.actual }));
    
    onSave(updatedActualTimeline);
    setEditingWeek(null);
    setProgressValue('');
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Seguimiento de Avance</h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Periodo del Proyecto:</span>
          <span className="text-sm text-gray-600">
            {formatDate(startDate)} al {formatDate(endDate)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semana</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Periodo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proyectado</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Real</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weeks.map((week) => (
              <tr key={week.week}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Semana {week.week}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{week.weekKey}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  {week.projected}%
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  {week.actual !== null ? `${week.actual}%` : '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {isBefore(new Date(), parseDate(week.endDate)) && (
                    <button
                      onClick={() => {
                        setEditingWeek(week.week);
                        setProgressValue(week.actual || '');
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {week.actual !== null ? 'Editar' : 'Registrar'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingWeek !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2">Registrar Avance - Semana {editingWeek}</h4>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md mr-3"
              value={progressValue}
              onChange={(e) => setProgressValue(e.target.value)}
              placeholder="% Avance"
            />
            <button
              onClick={handleSaveProgress}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingWeek(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTimeline;