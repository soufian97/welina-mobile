import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  modal: {
    width: width * 0.8,
    height: (2 * height) / 3,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  modalTextView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'Mulish',
    marginHorizontal: '5%',
    textAlign: 'center',
    fontSize: width / 25,
    color: colors.SECONDARY,
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: width * 0.3,
    height: height / 20,
    backgroundColor: colors.SECONDARY,
    borderRadius: height / 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    color: colors.WHITE,
    fontSize: width / 23,
  },
  buttonActivateContainer: {
    width: width * 0.6,
    height: height / 18,
    backgroundColor: colors.SECONDARY,
    borderRadius: height / 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 6,
    height: width / 6,
  },
});
