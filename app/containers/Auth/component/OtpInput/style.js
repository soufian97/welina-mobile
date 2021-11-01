import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';

export const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
  },
  inputContainer: {
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 20,
  },
  textInput: {
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 20,
    textAlign: 'center',
    height: 66,
    width: 66,
    fontSize: 25,
    fontFamily: 'Mulish-Bold',
    lineHeight: 31,
  },
  textInputError: {
    borderColor: colors.RED,
    borderWidth: 2,
  },
});
