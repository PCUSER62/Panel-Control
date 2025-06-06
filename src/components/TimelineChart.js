import React, { useEffect, useRef } from 'react';

const TimelineChart = ({ timeline }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (svgRef.current && timeline.length > 0) {
      const svg = svgRef.current;
      const paths = svg.querySelectorAll('path');
      
      paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = 'stroke-dashoffset 1.5s ease-out';
        path.style.strokeDashoffset = '0';
      });
    }
  }, [timeline]);

  const maxValue = Math.max(
    ...timeline.map(item => Math.max(item.projected || 0, item.actual || 0))
  );

  const getX = (index) => (index * 180) / (timeline.length - 1) + 10;
  const getY = (value) => 180 - (value * 160) / maxValue;

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Curva de Avance</h3>
      <div className="overflow-x-auto">
        <svg 
          ref={svgRef}
          width={Math.max(400, timeline.length * 60)} 
          height="200" 
          viewBox={`0 0 ${Math.max(400, timeline.length * 60)} 200`}
          className="w-full"
        >
          {/* Ejes */}
          <line x1="10" y1="20" x2="10" y2="180" stroke="#D1D5DB" strokeWidth="1" />
          <line x1="10" y1="180" x2={Math.max(390, timeline.length * 60 - 10)} y2="180" stroke="#D1D5DB" strokeWidth="1" />

          {/* Proyectado */}
          <path
            d={timeline.map((item, i) => 
              `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(item.projected)}`
            ).join(' ')}
            fill="none"
            stroke="#6366F1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Real */}
          <path
            d={timeline.filter(item => item.actual !== null).map((item, i) => 
              `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(item.actual)}`
            ).join(' ')}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Puntos y etiquetas */}
          {timeline.map((item, i) => (
            <React.Fragment key={i}>
              <circle
                cx={getX(i)}
                cy={getY(item.projected)}
                r="3"
                fill="#6366F1"
              />
              {item.actual !== null && (
                <circle
                  cx={getX(i)}
                  cy={getY(item.actual)}
                  r="3"
                  fill="#10B981"
                />
              )}
              <text
                x={getX(i)}
                y="195"
                textAnchor="middle"
                fontSize="10"
                fill="#6B7280"
              >
                {new Date(item.date).toLocaleDateString('es-ES', {month: 'short'})}
              </text>
            </React.Fragment>
          ))}
        </svg>
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

export default TimelineChart;

// DONE