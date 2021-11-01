import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  header: {
    alignItems: 'center',
    width: width * 0.95,
  },
  title: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.0221,
    lineHeight: height * 0.03,
  },
  dropDownContainer: {
    backgroundColor: colors.WHITE_BACKGROUND,
    borderRadius: 10,
    justifyContent: 'center',
    height: 40,
    width: width / 2.5,
  },
  dropDown: {
    backgroundColor: colors.WHITE_BACKGROUND,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  labelStyle: {
    fontFamily: 'Mulish',
    fontSize: height * 0.015,
  },
  bottom: {
    width: width * 0.8,
    zIndex: -1,
  },
  datesLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginVertical: 30,
    paddingVertical: 40,
    backgroundColor: colors.WHITE,
    width: width * 0.85,
    borderRadius: 20,
  },
  dateLabel: {
    width: width / 4.5,
    height: height / 20,
    borderRadius: 10,
    borderColor: colors.LIGHT_GRAY,
    borderWidth: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitles: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingRight: 15,
  },
  flatListStyle: {
    borderRadius: 10,
    zIndex: -1,
  },
  cardDay: {
    zIndex: -2,
    width: height * 0.11,
    height: height * 0.11,
    backgroundColor: colors.WHITE,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 5,
  },
  normalText: (isSelected) => ({
    fontFamily: 'Mulish',
    fontSize: height * 0.018,
    color: isSelected ? colors.WHITE : colors.GRAY_DARK,
  }),
  dayNumber: (isSelected) => ({
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.032,
    color: isSelected ? colors.WHITE : colors.GRAY_DARK,
  }),
  textMonthYear: {
    marginRight: width * 0.1,
    color: colors.PRIMARY_DARK,
    fontSize: height * 0.015,
    fontFamily: 'Mulish-Bold',
  },
});
export default Style;
