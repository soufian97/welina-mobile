import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    width: width * 0.9,
    maxHeight: height * 0.5,
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE_BACKGROUND,
    borderWidth: 4,
    borderColor: colors.WHITE,
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  reviewsBar: {
    marginBottom: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  chart: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  value: {
    marginHorizontal: 3,
    fontSize: 13,
    color: colors.BLACK_REVIEW,
    fontFamily: 'Mulish',
    lineHeight: 20,
    fontWeight: '600',
  },
  total: {
    fontSize: 13,
    color: colors.GRAY,
    fontFamily: 'Mulish',
    lineHeight: 20,
    textTransform: 'lowercase',
  },

  title: {
    fontSize: 17,
    color: colors.BLACK_REVIEW,
    fontFamily: 'Mulish',
    lineHeight: 20,
    fontWeight: '700',
  },
  reviewsContainer: {
    flex: 5,
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
  reviews: {
    flex: 1,
  },
});
export default Style;
