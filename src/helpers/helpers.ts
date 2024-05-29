export const formatDate = (date: Date): string => {
  const adjustedDate = new Date(date.getTime());

  adjustedDate.setHours(adjustedDate.getHours() - 5);
  adjustedDate.setMinutes(adjustedDate.getMinutes() - 23);

  const day = adjustedDate.getDate().toString().padStart(2, '0');
  const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = adjustedDate.getFullYear();
  const hours = adjustedDate.getHours().toString().padStart(2, '0');
  const minutes = adjustedDate.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}