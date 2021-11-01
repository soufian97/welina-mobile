import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
export const Style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 15,
  },
  name: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 13,
    color: colors.BLACK_REVIEW,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.GRAY,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  rating: {
    marginLeft: 4,
    fontFamily: 'Mulish',
  },
  reportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontFamily: 'Mulish',
    fontSize: 13,
    color: colors.GRAY,
  },
  review: {
    marginVertical: 10,
    fontFamily: 'Mulish',
    fontSize: 13,
    color: colors.BLACK_REVIEW,
    lineHeight: 22,
  },
  report: {
    fontFamily: 'Mulish',
    fontSize: 13,
    color: colors.GRAY,
  },
});
export default Style;
