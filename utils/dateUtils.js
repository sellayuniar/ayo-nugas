import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
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
