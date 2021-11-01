import { format, getYear, eachDayOfInterval } from 'date-fns';

export const getAlphabeticDate = (date, pattern = 'EEEE,  LLLL dd,  y') =>
  format(new Date(date), pattern);

export const getCurrentDateFormatter = (pattern = 'yyyy-MM-dd') =>
  format(new Date(), pattern);

export const getDateFormatter = (date, pattern = 'yyyy-MM-dd') =>
  date ? format(new Date(date), pattern) : null;

const getMonthNumber = (month) => {
  let monthNumber = new Date(month).getMonth() + 1;
  return monthNumber >= 10 ? monthNumber : `0${monthNumber}`;
};

const getDayNumber = (day) => {
  return day >= 10 ? day : `0${day}`;
};

export const dateFromMonthAndDay = (date, day) =>
  `${getYear(date)}-${getMonthNumber(date)}-${getDayNumber(day)}`;

export const getYearMonthObject = (date) => {
  date = date.split('-');
  return {
    year: date[0],
    month: date[1],
  };
};

export const secsToMins = (time) => {
  let hrs = (time / 3600).toFixed(0);
  let mins = Math.floor((time % 3600) / 60);
  let secs = time % 60;

  let ret = '';
  if (hrs > 0) {
    ret += `${hrs}: ${mins < 10 ? '0' : ''}`;
  }
  ret += `${mins}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};

export const getDateRangeOfDate = (start, end, sliceFirst = true) => {
  if (start && end) {
    let range = eachDayOfInterval({
      start: new Date(start),
      end: new Date(end),
    }).map((date) => getDateFormatter(date));
    if (sliceFirst && range.length > 1) {
      return range.slice(1);
    } else if (range[0] === getCurrentDateFormatter()) {
      return [null];
    } else {
      return range;
    }
  } else {
    return [null];
  }
};

export const formatDateRange = (start, end, pattern = 'dd MMM') => {
  if (start && end) {
    return `${format(new Date(start), pattern)}❜ - ${format(
      new Date(end),
      pattern,
    )}❜，`;
  }
  return '';
};
