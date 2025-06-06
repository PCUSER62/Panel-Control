export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    // Si es string (dd/mm/yyyy), devolverlo tal cual
    if (typeof date === 'string' && date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return date;
    }
    
    // Si es objeto Date, formatearlo
    if (date instanceof Date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}/${month}/${date.getFullYear()}`;
    }
    
    return '';
  } catch {
    return '';
  }
};

export const parseDate = (dateString) => {
  if (!dateString) return new Date();
  
  try {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  } catch {
    return new Date();
  }
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addWeeks = (date, weeks) => {
  return addDays(date, weeks * 7);
};

export const isBefore = (date, compareDate) => {
  return date.getTime() < compareDate.getTime();
};

export const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${now.getFullYear()}`;
};

// DONE