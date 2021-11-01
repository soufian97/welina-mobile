import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { width, height } = Dimensions.get('window');
const textFont = {
  fontFamily: 'Mulish-Bold',
  fontSize: 13,
  lineHeight: 16,
  color: colors.BLACK,
};
export const Style = StyleSheet.create({
  firstStepScreen: {
    flex: 1,
  },
  step: {
    ...textFont,
    fontWeight: '700',
    marginLeft: 24,
  },
  selectSession: {
    ...textFont,
    fontSize: height * 0.03399,
    lineHeight: height * 0.039,
    marginLeft: 24,
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
  date: {
    ...textFont,
    fontSize: 15,
    lineHeight: 18,
    marginLeft: 24,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconColorSelected: (selected) => ({
    color: selected ? colors.WHITE : colors.GRAY_DARK,
  }),
  topContainer: {
    height: 420,
    marginTop: 45,
  },
  bottomContainer: {
    justifyContent: 'space-evenly',
    height: 230,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberOfPersonsContainer: {
    marginTop: 35,
    height: 120,
    justifyContent: 'space-evenly',
  },
  numberOfPersons: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 90,
  },
  numberOfPersonsText: {
    paddingLeft: width * 0.05,
    fontFamily: 'Mulish-Bold',
    fontSize: 17,
  },
  bottomTextContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBottom: (primary) => ({
    color: primary ? colors.PRIMARY_DARK : colors.BLACK,
    fontFamily: 'Poppins',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    marginHorizontal: 2,
  }),
  handleMaxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
