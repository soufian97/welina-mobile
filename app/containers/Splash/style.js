import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('screen');

export const Style = StyleSheet.create({
  imageContainer: {
    width,
    height,
    flex: 1,
  },
  viewContainer: {
    backgroundColor: colors.SECONDARY_OPACITY,
    width,
    height,
    flex: 1,
  },
  headerContainer: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    width,
    flex: 1.25,
    justifyContent: 'space-evenly',
    paddingHorizontal: width * 0.1,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: height / 20,
    color: colors.WHITE,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: width / 23,
    color: colors.WHITE,
  },
});
