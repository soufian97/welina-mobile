import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { height } = Dimensions.get('window');

const diameter = height * 0.065;
export const Style = StyleSheet.create({
  container: {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_DARK,
    position: 'absolute',
    right: 30,
    bottom: 20,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.6,
    elevation: 3,
    zIndex: 9999999,
  },
});
