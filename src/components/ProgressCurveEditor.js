import React, { useState, useRef, useEffect } from 'react';

const ProgressCurveEditor = ({ timeline = [], onSave }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const canvasRef = useRef(null);
  const maxValue = 100;

  // Asegurar que timeline tenga datos válidos
  const validatedTimeline = Array.isArray(timeline) && timeline.length > 0 
    ? timeline 
    : [
        { date: new Date().toISOString().split('T')[0], projected: 0, actual: 0 },
        { date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], projected: 50, actual: null },
        { date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], projected: 100, actual: null }
      ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = padding + i * (height - 2 * padding) / 10;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.fillText(`${maxValue - i * 10}%`, 10, y + 4);
    }

    // Draw projected line
    ctx.beginPath();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    validatedTimeline.forEach((item, i) => {
      const x = padding + i * (width - 2 * padding) / (validatedTimeline.length - 1);
      const y = padding + (height - 2 * padding) * (1 - (item.projected || 0) / maxValue);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw actual line
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    validatedTimeline.forEach((item, i) => {
      if (item.actual === null || item.actual === undefined) return;
      const x = padding + i * (width - 2 * padding) / (validatedTimeline.length - 1);
      const y = padding + (height - 2 * padding) * (1 - item.actual / maxValue);
      if (i === 0 || validatedTimeline[i-1].actual === null) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points
    validatedTimeline.forEach((item, i) => {
      const x = padding + i * (width - 2 * padding) / (validatedTimeline.length - 1);
      
      // Projected point
      if (item.projected !== null && item.projected !== undefined) {
        const yProj = padding + (height - 2 * padding) * (1 - item.projected / maxValue);
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(x, yProj, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.date.substring(5, 10), x, height - padding + 15);
      }

      // Actual point
      if (item.actual !== null && item.actual !== undefined) {
        const yActual = padding + (height - 2 * padding) * (1 - item.actual / maxValue);
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, yActual, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Make editable points interactive
        canvas.onmousedown = (e) => {
          const rect = canvas.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          if (Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - yActual, 2)) < 10) {
            setEditingIndex(i);
            setEditingValue(item.actual);
          }
        };
      }
    });
  }, [validatedTimeline]);

  const handleSave = () => {
    if (editingIndex !== null && !isNaN(editingValue)) {
      const newValue = Math.min(100, Math.max(0, Number(editingValue)));
      const updatedTimeline = [...validatedTimeline];
      updatedTimeline[editingIndex].actual = newValue;
      onSave(updatedTimeline);
    }
    setEditingIndex(null);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Curva de Avance</h3>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
            <span className="text-sm">Proyectado</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-sm">Real</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={300}
          className="border border-gray-200 rounded-lg"
        />
      </div>

      {editingIndex !== null && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center">
          <input
            type="number"
            min="0"
            max="100"
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            className="w-20 px-3 py-1 border border-blue-300 rounded mr-2"
          />
          <span className="text-sm mr-4">% para {validatedTimeline[editingIndex].date}</span>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Guardar
          </button>
          <button
            onClick={() => setEditingIndex(null)}
            className="px-3 py-1 ml-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressCurveEditor;

// DONE