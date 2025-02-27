import moment from "moment";

export const formatDate = (registrationEntryDate: string): string => {
  return registrationEntryDate
    ? moment(registrationEntryDate).format("DD/MM/YYYY")
    : "";
};
export const formatDateTime = (registrationEntryDate: string): string => {
  return registrationEntryDate
    ? moment(registrationEntryDate).format("DD/MM/YYYY hh:mm:ss")
    : "";
};

export const validateCitologyDate = (lastDate: string): boolean => {
  const currentDate = moment();
  const lastCitologyDate = moment(lastDate, "DD/MM/YYYY");
  const diffInYears = currentDate.diff(lastCitologyDate, "year");
  return diffInYears <= 1;
};
export const formatDateTime24Hours = (
  registrationEntryDate: string
): string => {
  return registrationEntryDate
    ? moment(registrationEntryDate).format("DD/MM/YYYY HH:mm:ss")
    : "";
};

export const adjustDate = (date: string) => {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + 1); // Aumenta un día
  return adjustedDate;
};

export const adjustDateForCalendar = (date: string) => {
  return moment(date).add(1, "days").toDate(); // Suma un día solo para mostrar
};
