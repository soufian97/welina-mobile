import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('screen');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
    paddingHorizontal: width * 0.05,
  },
  receivingRequestsText: {
    fontFamily: 'Mulish',
    color: colors.BLUE_DARK,
    fontWeight: '600',
    fontSize: 24,
    marginBottom: '7%',
  },
  activityIndicator: {
    marginBottom: 8,
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
