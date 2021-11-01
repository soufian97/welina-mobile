import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { height, width } = Dimensions.get('window');
export const Style = StyleSheet.create({
  marginTopStyle: {
    marginTop: 20,
    marginBottom: 40,
  },
  container: {
    position: 'absolute',
    height,
    width,
    top: 0,
    left: 0,
  },
  maps: {
    height: height * 1.1,
  },
  screen: {
    flex: 1,
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
    maxWidth: '88%',
    alignSelf: 'auto',
    marginHorizontal: 20,
  },
  textSubAnswer: {
    maxWidth: '100%',
    alignSelf: 'auto',
    fontSize: height * 0.02216,
    lineHeight: height * 0.034,
    textAlign: 'justify',
  },
  textClickHere: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.02216,
    lineHeight: height * 0.034,
    top: height * 0.004,
  },
});
