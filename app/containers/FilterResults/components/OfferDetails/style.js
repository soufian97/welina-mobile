import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  detailsContainer: (height, translateY) => ({
    width: width * 0.9,
    height: height,
    zIndex: 10,
    backgroundColor: colors.WHITE_SECONDARY,
    marginHorizontal: width * 0.05,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: colors.WHITE,
    paddingVertical: 10,
    transform: [{ translateY }],
  }),
  image: {
    width: width * 0.9 - 20,
    height: height * 0.4,
    left: 5,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.GRAY,
  },
  basket: {
    position: 'absolute',
    left: 20,
    top: 30,
  },
  mapPin: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    color: colors.WHITE,
    marginLeft: 5,
    fontFamily: 'Mulish',
  },
  about: {
    padding: 10,
    marginBottom: 100,
  },
  markerTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.DARK_HIGH_OPACITY,
    borderRadius: 5,
    height: 20,
    shadowColor: colors.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    paddingHorizontal: 5,
  },
  iconStyle: {
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerHeader: {
    height: height * 0.07,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.9 - 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  offerTitle: {
    flex: 2,
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
    fontSize: 18,
  },
  ratingContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  numberOfStars: {
    fontSize: 16,
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
  },
  ratingPoints: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.WHITE,
    marginLeft: -15,
    backgroundColor: colors.GRAY,
  },
  feesAndBooking: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingLeft: 10,
    paddingRight: 20,
  },
  feesText: {
    color: colors.GRAY_BLUE,
    fontFamily: 'Mulish',
  },
  button: {
    position: 'relative',
    left: width * 0.55,
    bottom: 60,
  },
  price: {
    color: colors.TEXT_ORANGE,
    fontSize: 24,
    fontFamily: 'Mulish-Bold',
  },
  duration: {
    color: colors.TEXT_ORANGE,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Mulish',
  },
  sessionFees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
});
