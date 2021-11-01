import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
  },
  textScreenTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.022,
    marginVertical: 25,
    width: '80%',
    marginLeft: 15,
  },
  calendarCardContainer: {
    height: width * 0.9,
    width: width * 0.9,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: colors.WHITE,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 15,
  },
  buttonContainer: {
    height: height * 0.1,
    marginBottom: 22,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputText: {
    marginTop: 15,
    height: height * 0.18,
    textAlignVertical: 'top',
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
  },
  calendar: {
    width,
    marginTop: 25,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  calendarHeader: {
    height: height * 0.09375,
    flexDirection: 'column-reverse',
  },
  coachMessageContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 8,
    borderRadius: 15,
  },
});

export const CustomCalendarTheme = {
  'stylesheet.calendar.header': {
    week: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 8,
    },
    monthText: {
      margin: 0,
      marginLeft: -3,
      color: colors.CALENDAR_MONTH_TEXT,
      fontFamily: 'Mulish-Bold',
      fontSize: 11,
      lineHeight: 14,
    },
    header: {
      justifyContent: 'space-around',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 6,
    },
  },
  'stylesheet.calendar.main': {
    monthView: {
      height: 268.6,
    },
  },
};
