import moment from "moment";
import "moment/locale/vi";

// Set the locale to Vietnamese
moment.locale("vi");

export function formatDate(dateString: Date, format = "DD MMMM YYYY"): string {
  return moment(dateString).format(format);
}

export function compareDatesStrict(date1: Date, date2: Date) {
  const date_1 = new Date(date1).getTime();
  const date_2 = new Date(date2).getTime();

  return Math.sign(date_1 - date_2);
}
