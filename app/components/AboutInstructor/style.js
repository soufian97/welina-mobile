import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: colors.SECONDARY,
    fontFamily: 'Mulish-Bold',
    lineHeight: 23,
    fontWeight: '800',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 15,
  },
  name: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '500',
    fontSize: 14,
    color: colors.GRAY_TEXT,
  },
  type: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: colors.LIGHT_GRAY_SECONDARY,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    height: 37,
    width: 37,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: colors.GRAY,
  },
  instructorText: {
    fontSize: 10,
    color: colors.LIGHT_GRAY_SECONDARY,
    fontFamily: 'Mulish',
    lineHeight: 16.5,
    fontWeight: '400',
    marginBottom: 20,
  },
  readMore: {
    alignSelf: 'flex-end',
    color: colors.TEXT_ORANGE,
    fontFamily: 'Mulish',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 20,
  },
  bookingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.4,
  },
  packagePrice: {
    maxWidth: width * 0.4,
    justifyContent: 'center',
  },
  price: {
    color: colors.TEXT_ORANGE,
    fontSize: 22,
    fontFamily: 'Mulish-Bold',
  },
  duration: {
    color: colors.TEXT_ORANGE,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Mulish',
  },
  textPackagePrice: {
    color: colors.TEXT_ORANGE,
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
    marginBottom: 5,
  },
});
export default Style;
