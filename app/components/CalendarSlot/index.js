import React, { useCallback } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Style, CustomCalendarTheme } from './style';
import { Calendar } from 'react-native-calendars';
import {
  formatDateRange,
  getDateRangeOfDate,
} from '../../utils/date/dateFormater';
import { compareDesc, format, getYear } from 'date-fns';
import Day from './Day';
import { colors } from '../../utils/colors';
import { CalendarMonthArrowSwiper } from '../../assets/svgs';

const { width } = Dimensions.get('window');
const CALENDAR_DIMENSIONS = width * 0.9;
const CalendarSlot = ({
  calendarDimensions = CALENDAR_DIMENSIONS,
  selectedRange,
  setSelectedRange,
  headerStyle,
}) => {
  const getCalendarDateInRange = useCallback(() => {
    const dateInRange = {};
    getDateRangeOfDate(
      selectedRange.startingDay,
      selectedRange.endingDay,
    ).forEach((date) => {
      dateInRange[date] = { color: colors.PRIMARY_OPACITY, inRange: true };
    });
    return dateInRange;
  }, [selectedRange.endingDay, selectedRange.startingDay]);

  const onDayPressHandler = useCallback(
    (day) => {
      if (!selectedRange.startingDay && !selectedRange.endingDay) {
        setSelectedRange({
          ...selectedRange,
          startingDay: day.dateString,
        });
      }
      if (selectedRange.startingDay && !selectedRange.endingDay) {
        if (
          compareDesc(
            new Date(selectedRange.startingDay),
            new Date(day.dateString),
          ) === 1
        ) {
          setSelectedRange({
            ...selectedRange,
            endingDay: day.dateString,
          });
        } else {
          setSelectedRange({
            startingDay: day.dateString,
            endingDay: selectedRange.startingDay,
          });
        }
      }
      if (selectedRange.startingDay && selectedRange.endingDay) {
        setSelectedRange({
          startingDay: day.dateString,
        });
      }
    },
    [selectedRange, setSelectedRange],
  );
  return (
    <View style={Style.calendarContainer(calendarDimensions)}>
      <View style={Style.headerRangeDateContainer}>
        <Text style={Style.textHeaderRangeDateContainer}>
          {formatDateRange(selectedRange.startingDay, selectedRange.endingDay)}
        </Text>
        <Text style={Style.textCalendarYear}>
          {getYear(new Date(selectedRange.startingDay))}
        </Text>
      </View>
      <Calendar
        hideArrows={false}
        calendarWidth={calendarDimensions}
        calendarHeight={calendarDimensions}
        enableSwipeMonths={true}
        style={Style.calendar(calendarDimensions)}
        headerStyle={headerStyle}
        theme={CustomCalendarTheme}
        minDate={new Date()}
        markedDates={{
          [selectedRange.startingDay]: {
            selected: true,
            startingDay: true,
          },
          ...getCalendarDateInRange(),
          [selectedRange.endingDay]: {
            selected: true,
            endingDay: true,
          },
        }}
        markingType={'period'}
        onDayPress={onDayPressHandler}
        dayComponent={Day}
        hideExtraDays
        renderHeader={(date) => <Text>{format(date.getTime(), 'MMMM')}</Text>}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <CalendarMonthArrowSwiper />
          ) : (
            <CalendarMonthArrowSwiper style={Style.arrowRight} />
          )
        }
      />
    </View>
  );
};

export default CalendarSlot;
