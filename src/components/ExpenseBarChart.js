import React, { useRef, useEffect } from 'react';

const ExpenseBarChart = ({ monthlyExpenses, currency }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !monthlyExpenses.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const maxAmount = Math.max(...monthlyExpenses.map(e => e.amount)) * 1.2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + i * (canvas.height - 2 * padding) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
      
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.fillText(`${Math.round(maxAmount - i * maxAmount / 5)}`, 10, y + 4);
    }

    // Draw bars
    const barWidth = 30;
    const gap = 20;
    const zeroLine = canvas.height - padding;
    
    monthlyExpenses.forEach((expense, i) => {
      const x = padding + i * (barWidth + gap);
      const height = (expense.amount / maxAmount) * (canvas.height - 2 * padding);
      const y = zeroLine - height;
      
      // Bar
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x, y, barWidth, height);
      
      // Month label
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(expense.month.substring(5), x + barWidth/2, zeroLine + 15);
      
      // Amount label
      ctx.fillStyle = '#1e40af';
      ctx.fillText(`${currency}${expense.amount.toLocaleString()}`, x + barWidth/2, y - 5);
      
      // Trend indicator
      if (i > 0) {
        const change = ((expense.amount - monthlyExpenses[i-1].amount) / monthlyExpenses[i-1].amount) * 100;
        if (!isNaN(change)) {
          ctx.fillStyle = change >= 0 ? '#ef4444' : '#10b981';
          ctx.fillText(`${change >= 0 ? '+' : ''}${change.toFixed(1)}%`, x + barWidth/2, y - 25);
        }
      }
    });
  }, [monthlyExpenses]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Egresos Mensuales</h3>
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={monthlyExpenses.length * 50 + 60} 
          height="300"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ExpenseBarChart;