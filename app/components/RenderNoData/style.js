import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('screen');

export const Style = StyleSheet.create({
  noResultContainer: {
    alignItems: 'center',
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: colors.SECONDARY,
    marginBottom: height * 0.03,
  },
  noResultDescription: {
    position: 'relative',
    textAlign: 'center',
    paddingHorizontal: width / 6,
    fontFamily: 'Mulish',
    fontSize: 14,
    color: colors.SECONDARY,
  },
});
