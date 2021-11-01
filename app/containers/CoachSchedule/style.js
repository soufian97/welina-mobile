import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
  },
  textTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.023,
    lineHeight: height * 0.04,
  },
  selectedDateContainer: {
    marginTop: height * 0.04,
  },
  textTitleContainer: {
    fontFamily: 'Nunito-Bold',
    fontSize: height * 0.0221,
    lineHeight: height * 0.03,
    marginVertical: 20,
  },
  scheduleContainer: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  textEventTitle: {
    color: colors.WHITE,
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: height * 0.0221,
    lineHeight: height * 0.03,
    marginBottom: 8,
  },
  textEventTimeSlot: {
    color: colors.WHITE,
    fontFamily: 'Mulish',
    fontSize: height * 0.016,
    lineHeight: height * 0.022,
    marginBottom: 9,
  },
  splitterLine: {
    borderWidth: 1,
    borderColor: colors.CALENDAR_DISABLED_TEXT,
    marginBottom: 25,
  },
  splitterContainer: {
    position: 'absolute',
    width: '90%',
    height: '100%',
    justifyContent: 'space-evenly',
  },
});
