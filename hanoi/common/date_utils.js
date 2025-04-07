function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return ''; // Handle invalid date
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
}


function parseDate(dateStr) {
    // Handle formats like: "22:00 10/12/2024" or "12:20-18:44 20/12/2024"
    const match = dateStr.match(/(\d{2}:\d{2})(?:-\d{2}:\d{2})?\s+(\d{2}\/\d{2}\/\d{4})/);
    if (!match) return null;
    const [_, time, date] = match;
    const isoStr = `${date.split('/').reverse().join('-')}T${time}`;
    return new Date(isoStr);
}
  