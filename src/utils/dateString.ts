import MONTHS from 'constants/months';

export function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month}`;
}

export function getDateTime(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = date.getHours();
  const AmPm = date.getHours() > 12 ? 'PM' : 'AM';
  return `${month}/${day} ${hour}${AmPm}`;
}

export function getMonthYear(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  return `${MONTHS[month]}, ${year}`;
}
