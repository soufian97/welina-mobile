import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  header: {
    width: width * 0.9,
    marginBottom: 20,
  },
  title: {
    color: colors.GRAY_DARK,
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
    marginLeft: width * 0.05,
  },
  dropDownContainer: {
    height: 40,
    width: width / 2.7,
    zIndex: 1,
  },
  dropDownStyle: {
    zIndex: 1,
  },
  dropDown: {
    backgroundColor: colors.WHITE_BACKGROUND,
  },
  labelStyle: {
    fontFamily: 'Mulish',
  },
  bottom: {
    width: width * 0.8,
    zIndex: -1,
    alignSelf: 'center',
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
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  flatListStyle: {
    borderRadius: 10,
    zIndex: -1,
  },
  cardDay: {
    zIndex: -2,
    width: width / 4,
    height: width / 4,
    backgroundColor: colors.WHITE,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  normalText: (isSelected) => ({
    fontFamily: 'Mulish',
    color: isSelected ? colors.WHITE : colors.GRAY_DARK,
  }),
  dayNumber: (isSelected) => ({
    fontFamily: 'Mulish-Bold',
    fontSize: 26,
    color: isSelected ? colors.WHITE : colors.GRAY_DARK,
  }),
});
export default Style;
