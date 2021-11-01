import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    height: height / 6,
  },
  headerContainer: {
    flex: 1,
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
  },
  sliderContainer: {
    flex: 2,
    width: width * 0.9,
    alignSelf: 'center',
  },
  minMaxFees: {
    color: colors.GRAY_TEXT,
    fontFamily: 'Mulish',
  },
  slider: {
    alignSelf: 'center',
    width: width * 0.85,
  },
});
export default Style;
