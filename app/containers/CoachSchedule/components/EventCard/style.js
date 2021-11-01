import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  eventCardContainer: (isFullHeight) => ({
    width: width * 0.6,
    height: isFullHeight ? height * 0.45 : height * 0.25,
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  }),
  eveningPosstion: {
    position: 'absolute',
    bottom: 0,
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
    fontFamily: 'Nunito-Bold',
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
    height: height * 0.5,
    justifyContent: 'space-evenly',
  },
  blackTextColor: {
    color: colors.BLUE_DARK,
  },
});
