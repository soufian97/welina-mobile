import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');
const CALENDAR_DIMENSIONS = width * 0.9;

export const Style = StyleSheet.create({
  calendar: (calendarDimensions = CALENDAR_DIMENSIONS) => ({
    width: calendarDimensions,
    height: calendarDimensions,
    alignSelf: 'center',
  }),
  headerRangeDateContainer: {
    position: 'absolute',
    top: 8,
    left: 25,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3000,
  },
  textHeaderRangeDateContainer: {
    fontFamily: 'Mulish-Bold',
  },
  calendarContainer: (calendarDimensions = CALENDAR_DIMENSIONS) => ({
    width: calendarDimensions,
    height: calendarDimensions,
    alignSelf: 'center',
    marginBottom: 10,
  }),
  textCalendarYear: {
    color: colors.GRAY,
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  arrowRight: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});

export const CustomCalendarTheme = {
  'stylesheet.calendar.header': {
    header: {
      width: '40%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
    },
    dayHeader: {
      color: colors.PRIMARY_DARK_OPACITY,
    },
  },
};
