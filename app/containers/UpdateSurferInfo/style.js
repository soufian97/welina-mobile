import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: height * 1.1,
    width: width,
    position: 'absolute',
  },
  textTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.03,
    lineHeight: height * 0.034,
    marginTop: height * 0.03,
    marginHorizontal: width * 0.05,
  },
  formContainer: {
    width: width * 0.9,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginHorizontal: width * 0.05,
    marginTop: height * 0.05,
  },
  button: {
    marginVertical: height * 0.06,
    marginHorizontal: width * 0.05,
  },
  input: {
    marginVertical: 5,
  },
  dotContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 2,
    width: '90%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.SECONDARY,
    marginRight: 3,
  },
  textInputTitle: {
    fontSize: 12,
    fontFamily: 'Mulish',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.SPLITTER,
    borderBottomWidth: 1,
    paddingRight: 5,
  },
  textError: {
    color: colors.RED,
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
  },
  toastStyle: {
    zIndex: 20,
  },
  imageProfileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  profileImage: {
    width: 67,
    height: 67,
    borderRadius: 24,
    backgroundColor: colors.GRAY,
  },
  inputFormData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.SPLITTER,
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 5,
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
  },
  currencyIcon: { width: height * 0.03, height: height * 0.03 },
  currencyContainer: {
    flexDirection: 'row',
    height: height * 0.055,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 5,
    width: width * 0.2,
    marginHorizontal: 10,
  },
  checkedCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  otpModalVisibilityContainer: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
});
