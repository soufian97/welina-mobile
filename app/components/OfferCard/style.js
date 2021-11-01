import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('screen');

export const Style = StyleSheet.create({
  container: {
    height: height / 5,
    width: width * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
    paddingLeft: 15,
    marginBottom: 15,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    flexDirection: 'row',
  },
  offerTitle: {
    flex: 2.2,
    fontFamily: 'Mulish-Bold',
    fontSize: height / 53,
    paddingRight: 10,
  },
  ratingAndOptions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  ratingContainer: {
    flexDirection: 'row',
    height: width / 15,
    width: width / 7,
    borderRadius: 16,
    backgroundColor: colors.PRIMARY_OPACITY,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Mulish',
    color: colors.PRIMARY_DARK,
    fontWeight: '600',
    fontSize: height / 60,
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    height: width / 15,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImages: {
    flex: 1,
    justifyContent: 'center',
  },
  offerDescription: {
    flex: 2,
    justifyContent: 'space-around',
  },
  offerImage: (index) => ({
    position: 'absolute',
    backgroundColor: colors.GRAY,
    width: width / 6,
    height: height / 9,
    left: index * 10,
    opacity: 1 - index * 0.4,
    zIndex: -index,
    borderRadius: 8,
    transform: [
      {
        scaleY: 1 - index * 0.2,
      },
    ],
  }),
  offerDescriptionText: {
    fontFamily: 'Mulish',
    fontSize: height / 65,
    color: colors.SECONDARY,
    paddingRight: '5%',
  },
  offerPriceText: {
    fontFamily: 'Mulish-Bold',
    fontSize: height / 45,
    color: colors.PRIMARY_DARK,
    paddingRight: '10%',
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.GRAY,
  },
  senderInfo: {
    marginLeft: 15,
  },
  senderFullName: {
    fontFamily: 'Poppins',
    fontSize: height / 70,
    color: colors.BLUE_DARK,
  },
  senderType: {
    fontFamily: 'Poppins',
    fontSize: height / 70,
    color: colors.GRAY_DARK_TEXT,
    paddingRight: '5%',
  },
  cardFooter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDate: {
    fontFamily: 'Poppins',
    fontSize: height / 70,
    color: colors.GRAY_TEXT,
  },
});
