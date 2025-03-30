
export const getTimeAgo = (date: Date | number | string): string => {
  const now = new Date();
  const timeDate = new Date(date);

  // Verificar si la fecha es válida
  if (isNaN(timeDate.getTime())) {
    return "";
  }

  const diffInSeconds = Math.floor((now.getTime() - timeDate.getTime()) / 1000);

  // Menos de un minuto
  if (diffInSeconds < 60) {
    return "hace un momento";
  }

  // Minutos
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }

  // Horas
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  }

  // Días
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `hace ${days} ${days === 1 ? "día" : "días"}`;
  }

  // Meses
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  }

  // Años
  const years = Math.floor(days / 365);
  return `hace ${years} ${years === 1 ? "año" : "años"}`;
};
