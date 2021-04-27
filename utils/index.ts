export function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month}`;
}
