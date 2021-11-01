import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginHorizontal: 10,
    height: 50,
    marginBottom: 10,
  },
  icons: {
    flex: 1,
    width: width * 0.05,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
  },
  input: {
    width: width * 0.1,
    textAlign: 'center',
    fontFamily: 'Mulish-bold',
  },
  label: {
    fontFamily: 'Mulish',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 12,
    color: colors.GRAY_TEXT,
  },
  iconStyle: {
    color: colors.PRIMARY,
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
  },
});
export default Style;
