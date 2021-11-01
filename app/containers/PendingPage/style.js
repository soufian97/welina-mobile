import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    height: height * 1.1,
  },
  topLayer: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 10,
  },
  noResultContainer: {
    position: 'absolute',
    top: height / 8,
    bottom: height / 8,
    height: (3 * height) / 4,
    width: width,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
    fontSize: 22,
    color: colors.SECONDARY,
    marginBottom: height * 0.05,
  },
  noResultDescription: {
    position: 'relative',
    textAlign: 'center',
    paddingHorizontal: width / 6,
    fontFamily: 'Mulish',
    fontSize: 18,
    color: colors.SECONDARY,
  },
});
