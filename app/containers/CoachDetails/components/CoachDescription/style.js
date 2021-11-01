import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { width } = Dimensions.get('window');
const textStyle = {
  fontFamily: 'Roboto',
  fontWeight: '500',
  fontSize: 14,
  lineHeight: 16,
  color: colors.GRAY_TEXT,
};
export const Style = StyleSheet.create({
  descriptionContainer: {
    flex: 1,
    width: width * 0.9,
    borderWidth: 4,
    borderColor: colors.WHITE,
    borderRadius: 10,
    backgroundColor: colors.WHITE_BACKGROUND,
    padding: 17,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    flex: 0.7,
  },
  profileFrame: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: colors.GRAY,
  },
  textNameContainer: {
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  icon: {
    height: 38,
    width: 38,
    borderRadius: 38 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textName: {
    ...textStyle,
    marginBottom: 5,
  },
  textStatus: {
    ...textStyle,
    color: colors.LIGHT_GRAY,
    lineHeight: 14,
  },
  mainTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    lineHeight: 18,
    marginVertical: 27,
  },
  textBasicInfo: {
    fontFamily: 'Mulish',
    fontSize: 10,
    lineHeight: 16,
    color: colors.LIGHT_GRAY,
  },
  textAffirmation: {
    fontFamily: 'Mulish',
    fontSize: 13,
    lineHeight: 16,
    color: colors.BLACK,
  },
  textCoachInfo: {
    fontFamily: 'Mulish',
    fontSize: 15,
    lineHeight: 18,
    color: colors.BLACK,
    marginBottom: 20,
    marginTop: 8,
  },
  marginBottom: {
    marginBottom: 50,
  },
  galleryContainer: { justifyContent: 'center', alignItems: 'center' },
});
