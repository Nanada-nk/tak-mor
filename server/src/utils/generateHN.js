// Utility to generate a unique hospital number (hn) for Patient

function generateHN() {
  // Example: 'HN' + YYYYMMDD + HHMMSS
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;
  const timeStr = `${hh}${min}${ss}`;
  return `HN${dateStr}${timeStr}`;
}

export default generateHN;
