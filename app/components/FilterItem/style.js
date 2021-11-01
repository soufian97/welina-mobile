import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: (hasError) => ({
    backgroundColor: colors.WHITE_BACKGROUND,
    width: width * 0.9,
    marginTop: height / 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: hasError ? colors.RED_BORDER : colors.WHITE,
    alignItems: 'center',
  }),
  radioIconContainer: {
    left: 20,
  },
  header: {
    height: height / 10,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Mulish-Bold',
    marginLeft: 20,
    fontSize: 15,
    color: colors.SECONDARY,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  headerRight: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Style;
