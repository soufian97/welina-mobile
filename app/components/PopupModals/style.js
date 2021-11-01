import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('screen');

const MODAL_STYLE = {
  width: width * 0.8,
  backgroundColor: colors.WHITE,
  borderRadius: 10,
  justifyContent: 'space-evenly',
};
export const Style = StyleSheet.create({
  container: (withBackground) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    backgroundColor: withBackground ? colors.BLUE_MODAL_BACKGROUND : null,
  }),
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    backgroundColor: colors.BLUE_MODAL_BACKGROUND,
  },
  modal: {
    ...MODAL_STYLE,
    height: height / 2.5,
  },
  modalIcon: {
    ...MODAL_STYLE,
    height: height / 3.5,
  },
  modalText: {
    fontFamily: 'Mulish',
    marginHorizontal: '5%',
    textAlign: 'center',
    fontSize: width / 25,
    color: colors.SECONDARY,
  },
  buttonText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    color: colors.WHITE,
    fontSize: width / 23,
  },
  closeButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: '95%',
    height: 30,
  },
  modalTextView: {
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    height: '33%',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '75%',
    height: 45,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.PRIMARY,
    borderRadius: 13,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDisable: {
    ...MODAL_STYLE,
    height: height / 3,
  },
  modalDisableTextView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDisableButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  buttonDisableContainer: {
    width: width * 0.3,
    height: height / 20,
    backgroundColor: colors.SECONDARY,
    borderRadius: height / 40,
    justifyContent: 'center',
    alignItems: 'center',
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
