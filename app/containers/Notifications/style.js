import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: width * 0.06,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
  },
  textTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.023,
    lineHeight: height * 0.04,
  },
  noResultContainer: {
    alignItems: 'center',
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: colors.SECONDARY,
    marginBottom: height * 0.04,
  },
});
