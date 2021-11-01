import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

const dismissDiameter = height * 0.04;
export const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.SECONDARY_OPACITY,
  },
  container: {
    height: height * 0.88,
    width: width * 0.88,
    marginHorizontal: width * 0.06,
    backgroundColor: colors.WHITE_BACKGROUND,
    borderRadius: 20,
    alignItems: 'center',
  },
  dismissButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: dismissDiameter,
    height: dismissDiameter,
    borderRadius: dismissDiameter / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDismissIcon: {
    fontSize: height * 0.023,
    color: colors.GRAY,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
  },
  textExplain: {
    width: width * 0.8,
    fontSize: height * 0.018,
    fontFamily: 'Mulish',
    fontWeight: '400',
    marginTop: 35,
    marginBottom: 10,
  },
  textInputContainer: {
    height: height * 0.45,
    width: width * 0.8,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.GRAY,
    padding: 15,
  },
  dropdownContainer: {
    height: height * 0.05,
    width: width * 0.8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.GRAY,
    justifyContent: 'center',
  },
  mainDropdownContainerStyle: {
    height: height * 0.05,
    width: width * 0.8,
    justifyContent: 'center',
  },
  textClickToEnd: {
    textAlign: 'center',
    width: width * 0.8,
    fontSize: height * 0.018,
    fontFamily: 'Mulish',
    fontWeight: '400',
    marginBottom: 10,
    color: colors.SECONDARY_LIGHT,
  },
  textError: {
    color: colors.RED,
    width: width * 0.75,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
  },
});
