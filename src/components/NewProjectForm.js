import React, { useState } from 'react';
import { getCurrentDate, addMonths } from '../utils/dateUtils';

const NewProjectForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    director: '',
    responsible: '',
    budget: '',
    salesGoal: '',
    additional: '',
    recognized: '',
    currency: 'PEN',
    startDate: getCurrentDate(),
    endDate: addMonths(getCurrentDate(), 3),
    hasSchedule: false,
    projectedTimeline: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    date: getCurrentDate(),
    progress: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddMilestone = () => {
    if (!newMilestone.date || !newMilestone.progress) return;

    const updatedTimeline = [
      ...formData.projectedTimeline,
      {
        date: newMilestone.date,
        progress: parseFloat(newMilestone.progress)
      }
    ].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateA - dateB;
    });

    setFormData(prev => ({
      ...prev,
      projectedTimeline: updatedTimeline
    }));
    setNewMilestone({ date: getCurrentDate(), progress: '' });
    setScheduleModal(false);
  };

  const handleRemoveMilestone = (index) => {
    const updated = [...formData.projectedTimeline];
    updated.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      projectedTimeline: updated
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      ...formData,
      id: Date.now(),
      budget: parseFloat(formData.budget) || 0,
      salesGoal: parseFloat(formData.salesGoal) || 0,
      additional: parseFloat(formData.additional) || 0,
      recognized: parseFloat(formData.recognized) || 0,
      monthlyExpenses: [],
      progressTimeline: [],
      status: 'Planificado',
      progress: 0,
      invoiced: 0
    };
    onSave(project);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Proyecto</h2>
      
      <div className="mb-6 flex border-b">
        <button
          className={`px-4 py-2 font-medium ${currentStep === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setCurrentStep(1)}
        >
          Información Básica
        </button>
        <button
          className={`px-4 py-2 font-medium ${currentStep === 2 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setCurrentStep(2)}
        >
          Datos Financieros
        </button>
        <button
          className={`px-4 py-2 font-medium ${currentStep === 3 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setCurrentStep(3)}
        >
          Planificación
        </button>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código*</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Director*</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsable*</label>
              <input
                type="text"
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto Venta*</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  {formData.currency === 'USD' ? '$' : 'S/'}
                </span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto Meta*</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  {formData.currency === 'USD' ? '$' : 'S/'}
                </span>
                <input
                  type="number"
                  name="salesGoal"
                  value={formData.salesGoal}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adicionales</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  {formData.currency === 'USD' ? '$' : 'S/'}
                </span>
                <input
                  type="number"
                  name="additional"
                  value={formData.additional}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reconocidos</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  {formData.currency === 'USD' ? '$' : 'S/'}
                </span>
                <input
                  type="number"
                  name="recognized"
                  value={formData.recognized}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="PEN">Soles (PEN)</option>
                <option value="USD">Dólares (USD)</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasSchedule"
                name="hasSchedule"
                checked={formData.hasSchedule}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasSchedule" className="ml-2 block text-sm text-gray-700">
                ¿Tiene cronograma definido?
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio*</label>
              <input
                type="text"
                name="startDate"
                placeholder="dd/mm/yyyy"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin*</label>
              <input
                type="text"
                name="endDate"
                placeholder="dd/mm/yyyy"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {formData.hasSchedule && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Planificación de Avance</h3>
                <button
                  type="button"
                  onClick={() => setScheduleModal(true)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Agregar Hito
                </button>
              </div>

              {formData.projectedTimeline.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avance Proyectado</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.projectedTimeline.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{item.progress}%</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => handleRemoveMilestone(index)}
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
              ) : (
                <p className="text-sm text-gray-500">No se han agregado hitos de avance</p>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Anterior
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Crear Proyecto
            </button>
          </div>
        </div>
      )}

      {scheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Agregar Hito de Avance</h3>
              <button onClick={() => setScheduleModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha (dd/mm/yyyy)*</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={newMilestone.date}
                  onChange={(e) => setNewMilestone({...newMilestone, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">% Avance Proyectado*</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={newMilestone.progress}
                  onChange={(e) => setNewMilestone({...newMilestone, progress: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setScheduleModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProjectForm;