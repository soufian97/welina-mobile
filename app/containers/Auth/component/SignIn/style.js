import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../../../utils/colors';
import { IOS } from '../../../../config/app.constant';

const { height, width } = Dimensions.get('screen');
export const Style = StyleSheet.create({
  keyboardAvoidContainer: {
    flex: 1,
  },
  screenContainer: {
    height: height,
  },
  imageContainer: {
    flex: 1,
    height: height,
    width,
  },
  viewContainer: {
    backgroundColor: colors.SECONDARY_OPACITY,
    paddingHorizontal: 19,
    width,
    height,
    flex: 1,
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === IOS ? 30 : 10,
  },
  arrowLeftStyle: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  logoLetterContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 5,
    paddingVertical: 18,
    borderRadius: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.12,
    justifyContent: 'space-around',
  },
  textBoldTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: height * 0.0344,
    lineHeight: height * 0.0418,
    color: colors.WHITE,
  },
  textRegularTitle: {
    fontFamily: 'Poppins',
    fontSize: height * 0.021,
    fontWeight: '400',
    lineHeight: 22,
    color: colors.WHITE,
    width: '75%',
    marginTop: 15,
  },
  formContainer: {
    flex: 0.38,
    justifyContent: 'space-around',
  },
  infoContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    paddingLeft: 10,
    width: width * 0.9,
    height: height * 0.16,
    justifyContent: 'space-evenly',
  },
  inviteCodeContainer: {
    backgroundColor: colors.WHITE,
    height: height * 0.0812,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textBottom: (primary) => ({
    color: primary ? colors.PRIMARY : colors.WHITE,
    fontFamily: 'Poppins',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    marginHorizontal: 2,
    marginVertical: 10,
  }),
  phoneInputContainer: {
    justifyContent: 'center',
    borderBottomColor: colors.SPLITTER,
    borderBottomWidth: 1,
    height: height * 0.079,
  },
  phoneWithFlag: {
    flexDirection: 'row',
  },
  countryPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: height * 0.05,
    width: width * 0.2,
  },
  textInputStyle: {
    paddingHorizontal: 2,
    width: width * 0.65,
    height: height * 0.05,
    justifyContent: 'center',
  },
  textStyle: {
    paddingHorizontal: 2,
    fontSize: 15,
    fontFamily: 'Poppins',
    paddingVertical: 5,
  },
  textError: {
    color: colors.RED,
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
  },
  password: {
    height: height * 0.079,
    justifyContent: 'space-evenly',
  },
  textForgotPassword: {
    textAlign: 'center',
    color: colors.PRIMARY,
    fontFamily: 'Poppins',
    fontSize: height * 0.0165,
    lineHeight: 20,
  },
});
