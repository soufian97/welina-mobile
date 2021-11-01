import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.6,
    alignSelf: 'center',
  },
  icon: {
    height: height * 0.065,
    width: height * 0.065,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
});
export default Style;
