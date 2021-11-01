import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { height, width } = Dimensions.get('window');

export const Style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
  },
  activityIndicator: {
    marginTop: height * 0.4,
    alignSelf: 'center',
  },
  textScreenTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.03,
    lineHeight: height * 0.04,
    marginLeft: 16,
    marginVertical: height * 0.03,
  },
  mainCardContainer: {
    width: width * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 30,
  },
  textCardTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: height * 0.024,
    lineHeight: height * 0.04,
    marginLeft: 15,
    marginTop: height * 0.025,
  },
  textCardSubTitle: {
    fontFamily: 'Mulish',
    fontSize: height * 0.019,
    color: colors.GRAY,
    marginLeft: 15,
    marginBottom: height * 0.015,
  },
  textOfferTitle: {
    fontFamily: 'Mulish-Bold',
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: height * 0.023,
  },
  textOfferCity: {
    fontFamily: 'Mulish',
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: height * 0.02,
  },
  titleContainer: {
    zIndex: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.SECONDARY_OPACITY,
  },
  offerImageContainer: {
    width: width * 0.8,
    height: height * 0.22,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: (index) => ({
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.22,
    left: index * 10,
    opacity: 1 - index * 0.4,
    zIndex: -index,
    borderRadius: 20,
    transform: [
      {
        scaleY: 1 - index * 0.2,
      },
    ],
    backgroundColor: colors.GRAY,
  }),
  dayPicker: {
    marginTop: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 25,
  },
  surferContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  avatarImage: {
    width: 33,
    height: 33,
    borderRadius: 33 / 2,
    backgroundColor: colors.GRAY,
  },
  textSurferName: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    width: '65%',
  },
  textSurferBadge: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    color: colors.GRAY,
  },
  surferNameContainer: {
    marginLeft: 10,
    flex: 3,
  },
  textServicePrice: {
    fontFamily: 'Mulish',
    fontWeight: '500',
    fontSize: height * 0.017,
    marginLeft: 15,
    flex: 3,
  },
  textServiceTotalPrice: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.017,
  },
  textSecurePayment: {
    fontFamily: 'Mulish',
    fontWeight: '500',
    fontSize: height * 0.0135,
    color: colors.GRAY,
  },
  textGroupSize: {
    fontFamily: 'Mulish',
    fontWeight: '500',
    fontSize: height * 0.0135,
    marginLeft: 23,
    flex: 3,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '120%',
  },
  menuItemMainContainer: {
    paddingHorizontal: 8,
  },
  textMenu: {
    marginLeft: 8,
  },
  textDuration: {
    fontSize: 15,
  },
  textDay: {
    color: colors.PRIMARY_DARK,
  },
  surferInformation: {
    marginBottom: 30,
  },
  menuIcon: {
    height: width / 15,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surferProfileContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});
