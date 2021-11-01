import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
  btn: ({ radius, width, height, marginVertical }) => ({
    borderRadius: radius,
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginVertical: marginVertical != null ? marginVertical : 8,
  }),
  mainText: (fontSize, textColor) => ({
    color: textColor,
    fontFamily: 'Mulish-Bold',
    fontSize: fontSize,
    fontWeight: '500',
  }),
  containerOpacity: (opacity) => ({
    opacity,
  }),
});
