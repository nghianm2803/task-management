import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDeadline(date: string) {
  const formattedDate = format(new Date(date), "yyyy-MM-dd HH:mm");
  return formattedDate;
}

export function fDate(date: string) {
  return format(new Date(date), "dd MMM yyyy");
}

export function fDateTime(date: string) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fTimestamp(date: string) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: string) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date: string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
