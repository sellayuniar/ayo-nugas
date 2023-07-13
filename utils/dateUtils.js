import moment from "moment";
import "moment/locale/id";

export const setengahJamLalu = (waktu) => {
  return moment(waktu).subtract(30, "minutes").toDate().getTime();
};

export const satuJamKemudian = (waktu) => {
  return moment(waktu).add(1, "hour").toDate().getTime();
};

export const formatWaktu = (waktu) => {
  return moment(waktu).format("DD/MM/YYYY HH:mm:ss");
};

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const formatDateWithDay = (date) => {
  return moment(date).format("ddd, DD/MM/YYYY");
};

export const formatDateWithFullDay = (date) => {
  return moment(date).format("dddd, DD/MM/YYYY");
};

export const formatDateReverse = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const startOfWeek = moment().startOf("isoWeek").toDate();
export const endOfWeek = moment().endOf("isoWeek").toDate();

export const getDayBetweenDates = (startDate, endDate) => {
  let dates = [];
  let now = moment(startDate);

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("MM/DD/YYYY"));
    now.add(1, "days");
  }
  return dates;
};
