import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';

export const Style = StyleSheet.create({
  offDay: {
    width: '100%',
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: colors.CALENDAR_DISABLED_TEXT,
    height: 0.5,
    transform: [{ rotate: '-45deg' }],
  },
  dayComponent: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDaySelected: {
    color: colors.WHITE,
    textAlign: 'center',
  },
  textDay: (outOfMonthRange, disabled) => ({
    fontFamily: 'Mulish',
    fontSize: 15,
    textAlign: 'center',
    color: getDayColor(outOfMonthRange, disabled),
  }),
  dayContainer: {
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_OPACITY,
    width: '135%',
  },
  startingDay: {
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_OPACITY,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  endingDay: {
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_OPACITY,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.TEXT_GREEN,
  },
});
const getDayColor = (outOfMonthRange, disabled) => {
  if (outOfMonthRange === 'disabled') {
    return colors.CALENDAR_OFF_TEXT;
  } else {
    if (disabled) {
      return colors.CALENDAR_DISABLED_TEXT;
    }
  }
  return colors.BLACK;
};
