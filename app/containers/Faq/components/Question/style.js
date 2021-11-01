import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  textQuestion: {
    fontSize: height * 0.03,
    lineHeight: height * 0.034,
    fontFamily: 'Mulish-Bold',
    color: colors.BLACK_REVIEW,
    width: '80%',
  },
  toArrowDown: {
    transform: [{ rotate: '-90deg' }],
  },
  textAnswer: {
    maxWidth: '88%',
    alignSelf: 'center',
    fontFamily: 'Mulish',
    fontSize: height * 0.02216,
    lineHeight: height * 0.034,
    marginVertical: 20,
    textAlign: 'justify',
  },
  textSubtitle: {
    fontFamily: 'Mulish-Bold',
    maxWidth: '100%',
    alignSelf: 'auto',
  },
  textSubAnswer: {
    maxWidth: '100%',
    alignSelf: 'auto',
    fontSize: height * 0.02216,
    lineHeight: height * 0.034,
    textAlign: 'justify',
  },
});
