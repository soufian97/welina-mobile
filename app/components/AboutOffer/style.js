import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoContainer: {
    flex: 1.5,
    paddingRight: 15,
  },
  about: {
    fontFamily: 'Mulish',
    fontSize: height / 66,
    lineHeight: 16,
    color: colors.LIGHT_GRAY_SECONDARY,
    marginVertical: 10,
  },
  features: {
    marginTop: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  txtFeature: {
    marginLeft: 10,
    fontFamily: 'Mulish',
    fontSize: height / 66,
    color: colors.LIGHT_GRAY_SECONDARY,
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
  name: {
    fontFamily: 'Mulish-Bold',
    fontSize: width / 25,
    color: colors.SECONDARY,
  },
  location: {
    marginLeft: 5,
    fontSize: 12,
    color: colors.TEXT_ORANGE,
    fontFamily: 'Mulish',
  },
  title: {
    fontSize: 18,
    color: colors.SECONDARY,
    fontFamily: 'Mulish-Bold',
    lineHeight: 23,
    fontWeight: '800',
    marginVertical: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    opacity: 0.7,
    backgroundColor: colors.SECONDARY,
    marginRight: 15,
  },
});
export default Style;
