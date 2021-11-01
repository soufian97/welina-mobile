import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  maps: {
    height: height * 1.1,
  },
  topLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
  },
  toastStyle: {
    zIndex: 20,
  },
});
