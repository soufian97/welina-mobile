import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { height, width } = Dimensions.get('window');

export const Style = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    height: height * 0.15,
    width: width * 0.9,
    borderWidth: 5,
    borderColor: colors.WHITE,
    borderRadius: 10,
    shadowOffset: {
      width: -10,
      height: 30,
    },
    shadowRadius: 20,
    shadowColor: colors.SHADOW_COLOR_CARD,
    shadowOpacity: 1,
    alignItems: 'center',
    paddingHorizontal: 7,
    marginVertical: height * 0.01,
    backgroundColor: colors.WHITE_BACKGROUND,
  },
  image: {
    flex: 0.25,
    height: height * 0.13,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: colors.GRAY,
  },
  infoContainer: {
    flex: 0.75,
    height: '100%',
    justifyContent: 'space-around',
  },
  priceContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.4,
  },
  price: {
    color: colors.TEXT_ORANGE,
    fontSize: height * 0.02463,
    lineHeight: height * 0.02955,
    fontFamily: 'Mulish-Bold',
  },
  duration: {
    color: colors.TEXT_ORANGE,
    fontSize: height * 0.01724,
    lineHeight: height * 0.021,
    fontWeight: '400',
    fontFamily: 'Mulish',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: height * 0.02,
    color: colors.BLUE_DARK,
    maxWidth: width * 0.25,
  },
  textCity: {
    fontFamily: 'Roboto',
    fontSize: height * 0.012,
    textTransform: 'uppercase',
    color: colors.BLUE_DARK,
    marginLeft: 5,
  },
  pending: {
    borderRadius: 10,
    paddingHorizontal: 8,
    minWidth: 60,
  },
  textStatus: {
    color: colors.WHITE,
    fontSize: height * 0.013,
    fontFamily: 'Mulish-Bold',
  },
  cancelButton: {
    backgroundColor: colors.WHITE_BAR_BACKGROUND,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: '20%',
  },
  textCancel: {
    color: colors.RED,
    fontSize: height * 0.015,
    fontFamily: 'Mulish-Bold',
    paddingHorizontal: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rescheduleIcon: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 35,
    height: 35,
    zIndex: 10,
  },
  rescheduleContainer: {
    borderColor: colors.PRIMARY,
  },
});
