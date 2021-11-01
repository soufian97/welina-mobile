import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  textLabel: {
    marginLeft: 15,
    fontFamily: 'Mulish',
    fontSize: 0.0172 * height,
    lineHeight: 0.01724 * height,
    color: colors.SECONDARY,
  },
  containerOpacity: (opacity) => ({
    opacity,
  }),
});
