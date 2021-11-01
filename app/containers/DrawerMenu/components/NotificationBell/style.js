import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';

export const Style = StyleSheet.create({
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.RED,
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 999,
  },
});
