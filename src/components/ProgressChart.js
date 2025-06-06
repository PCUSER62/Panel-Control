import React, { useRef, useEffect } from 'react';

const ProgressChart = ({ projected, actual, width = 800, height = 300 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const maxValue = 100;

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
    projected.forEach((item, i) => {
      const x = padding + i * (width - 2 * padding) / (projected.length - 1);
      const y = padding + (height - 2 * padding) * (1 - item.progress / maxValue);
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
    actual.forEach((item, i) => {
      if (item.progress === null || item.progress === undefined) return;
      const x = padding + i * (width - 2 * padding) / (actual.length - 1);
      const y = padding + (height - 2 * padding) * (1 - item.progress / maxValue);
      if (i === 0 || actual[i-1].progress === null) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points
    projected.forEach((item, i) => {
      const x = padding + i * (width - 2 * padding) / (projected.length - 1);
      
      // Projected point
      if (item.progress !== null && item.progress !== undefined) {
        const yProj = padding + (height - 2 * padding) * (1 - item.progress / maxValue);
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(x, yProj, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.date.substring(0, 5), x, height - padding + 15);
      }
    });

    actual.forEach((item, i) => {
      const x = padding + i * (width - 2 * padding) / (actual.length - 1);
      
      // Actual point
      if (item.progress !== null && item.progress !== undefined) {
        const yActual = padding + (height - 2 * padding) * (1 - item.progress / maxValue);
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, yActual, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [projected, actual, width, height]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Curva de Avance</h3>
      <div className="overflow-x-auto">
        <canvas 
          ref={canvasRef} 
          width={width} 
          height={height}
          className="border border-gray-200 rounded-lg"
        />
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
          <span className="text-sm">Proyectado</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Real</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;