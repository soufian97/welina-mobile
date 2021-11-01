import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { height, width } = Dimensions.get('window');

export const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    height,
    width,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: width * 0.05,
  },
  scrollViewContainer: {
    marginVertical: 25,
  },
  maps: {
    height: height * 1.1,
  },
  title: {
    fontFamily: 'Mulish-Bold',
    lineHeight: 30,
    fontSize: 24,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: 15,
    lineHeight: 24,
    marginVertical: 25,
    textAlign: 'justify',
  },
  paragraph: {
    fontFamily: 'Mulish',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  textCheckBox: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: colors.TERMS_TEXT_COLOR,
  },
  textCheckBoxContainer: {
    marginLeft: 15,
  },
  textCheckBoxHighlight: {
    fontFamily: 'Mulish',
    fontSize: 15,
    lineHeight: 24,
    color: colors.TEXT_GREEN,
  },
  buttonStyle: {
    marginVertical: 25,
  },
});
