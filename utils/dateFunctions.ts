export function getDaysRemaining(end_date?: string | Date): number | null {
  if (!end_date) return null;

  const today = new Date();
  const endDate = new Date(end_date); // Convierte el string ISO a Date

  // Normalizamos las fechas para comparar sin horas
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endDateMidnight = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  const diffInMs = endDateMidnight.getTime() - todayMidnight.getTime();

  // Si el viaje ya terminó o termina hoy
  if (diffInMs <= 0) return 0;

  // Diferencia en días
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

export function getTripProgress(start_date?: string | Date, end_date?: string | Date): number | null {
  if (!start_date || !end_date) return null;

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const now = new Date();

  // Si las fechas están invertidas o inválidas
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
    return 0;
  }

  // Si el viaje aún no ha empezado
  if (now < startDate) return 0;

  // Si el viaje ya terminó
  if (now >= endDate) return 100;

  // Calcular porcentaje entre las dos fechas
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progress = (elapsed / totalDuration) * 100;

  // Redondeamos a 2 decimales
  return Math.min(100, Math.max(0, parseFloat(progress.toFixed(2))));
}