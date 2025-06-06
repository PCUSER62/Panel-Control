const projects = [
  {
    id: 1,
    name: "Implementación ERP",
    responsible: "Juan Pérez",
    director: "Carlos Ruiz",
    status: "En progreso",
    progress: 65,
    budget: 120000,       // Presupuesto venta
    salesGoal: 150000,    // Presupuesto meta
    additional: 5000,     // Adicionales
    recognized: 80000,    // Montos reconocidos
    invoiced: 75000,      // Total facturado
    currency: "USD",
    monthlyExpenses: [
      { month: "2023-01", amount: 15000 },
      { month: "2023-02", amount: 12000 },
      { month: "2023-03", amount: 18000 }
    ]
  }
];

export default projects;