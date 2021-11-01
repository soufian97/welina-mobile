import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  // inputNumber
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: (width, center) => ({
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: center ? 'center' : 'flex-start',
    backgroundColor: colors.WHITE,
    height: height * 0.06,
    width,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
  }),
  icons: {
    flex: 1,
    width: '20%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '60%',
    textAlign: 'center',
    fontFamily: 'Mulish-bold',
    color: colors.BLACK_HIGH_OPACITY,
    fontSize: 16,
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
  // inputIcon
  inputIconContainer: {
    marginTop: 5,
  },
  inputRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomColor: colors.SPLITTER,
    borderBottomWidth: 1,
  },
  icon: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: (editable) => ({
    width: '90%',
    paddingVertical: 7,
    fontSize: 15,
    fontFamily: 'Poppins',
    color: editable === false ? colors.CALENDAR_OFF_TEXT : colors.BLACK,
  }),
  textTitle: (editable) => ({
    fontSize: 12,
    color: editable === false ? colors.CALENDAR_OFF_TEXT : colors.BLACK,
  }),
  // inputCustom
  textInputContainer: {
    height: '100%',
    width: '85%',
    justifyContent: 'space-around',
  },
  inputCustomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRightActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '100%',
  },
  textRightAction: {
    color: colors.SECONDARY_LIGHT,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  },
  textCustomInput: (editable) => ({
    paddingHorizontal: -5,
    fontSize: 15,
    fontFamily: 'Poppins',
    width: '85%',
    color: editable === false ? colors.CALENDAR_OFF_TEXT : colors.BLACK,
  }),
  textError: {
    color: colors.RED,
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
  },
});
export default Style;
