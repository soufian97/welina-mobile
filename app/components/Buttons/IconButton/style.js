import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/colors';

export const Style = StyleSheet.create({
  button: ({ radius, width, height }) => ({
    height: height,
    width: width,
    borderRadius: radius,
    justifyContent: 'center',
  }),
  textButton: (font) => ({
    fontFamily: 'Poppins-Regular',
    fontSize: font,
    lineHeight: 22,
    color: colors.WHITE,
    textAlign: 'center',
  }),
  text: (font) => ({
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: font,
    lineHeight: 16,
    color: colors.WHITE,
    marginLeft: 35,
  }),
  leftIcon: {
    position: 'absolute',
    left: 10,
  },
  rightIcon: {
    position: 'absolute',
    right: 21,
  },
  containerOpacity: (opacity) => ({
    opacity,
  }),
});

export default Style;
