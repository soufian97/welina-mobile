import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  screen: {
    paddingHorizontal: 25,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
  },
  textScreenTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.028,
    marginVertical: height * 0.03,
  },
  textScreenParagraph: {
    fontWeight: '500',
    fontSize: height * 0.02,
    marginVertical: height * 0.015,
    lineHeight: height * 0.03,
    width: width * 0.85,
  },
  textLabel: {
    fontFamily: 'Mulish-Bold',
    marginVertical: 13,
  },
  inputTextWrapper: {
    borderRadius: 5,
    borderColor: colors.SECONDARY_LIGHT,
    borderWidth: 0.5,
    backgroundColor: colors.WHITE,
    marginBottom: 8,
  },
  inputTextMultiline: {
    height: height * 0.12,
    margin: 5,
  },
  inputTextMonoLine: {
    height: height * 0.06,
    marginLeft: 8,
  },
  textAgreement: {
    fontFamily: 'Mulish',
    fontSize: height * 0.017,
    lineHeight: height * 0.028,
    marginVertical: height * 0.02,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  textBottom: {
    textAlign: 'center',
    width: width * 0.8,
    lineHeight: height * 0.025,
    marginBottom: 25,
  },
  textBold: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.017,
  },
  textError: {
    color: colors.RED,
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
    marginLeft: 5,
  },
});
