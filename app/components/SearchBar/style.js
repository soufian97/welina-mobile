import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: (width) => ({
    width: width,
    height: height * 0.07,
    borderRadius: 35,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 3,
  }),
  iconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '70%',
    justifyContent: 'center',
    height: height * 0.07,
  },
  input: {
    fontSize: height * 0.017,
    color: colors.GRAY_DARK,
  },
  deleteButton: {
    width: width / 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Style;
