import { getYear, getMonth, format, getDaysInMonth } from 'date-fns';

export const dateRange = (startDate, endDate) => {
  let startYear = getYear(startDate);
  let endYear = getYear(endDate);
  let dates = [];

  for (let i = startYear; i <= endYear; i++) {
    let endMonth = i !== endYear ? 11 : getMonth(endDate) - 1;
    let startMon = i === startYear ? getMonth(startDate) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      let month = j + 1;
      let displayMonth = month < 10 ? `0${month}` : month;
      let resultDate = new Date(i, displayMonth, 2);
      let formattedDate = format(resultDate, 'MMMM yyyy');
      dates.push({ label: formattedDate, value: resultDate });
    }
  }
  return dates;
};

export const getMonthsDays = (month, currentDate = new Date()) => {
  let days = [];

  let numberOfDays = getDaysInMonth(month);
  let monthNumber = getMonth(month);
  let year = getYear(month);
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  let currentDay =
    monthNumber > currentMonth || year > currentYear
      ? 1
      : currentDate.getDate();

  for (let i = currentDay; i <= numberOfDays; i++) {
    let day = new Date(year, monthNumber, i);
    let dayLabel = format(day, 'EEEE');
    days.push({ number: i, label: dayLabel });
  }

  return days;
};
