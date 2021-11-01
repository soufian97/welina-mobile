import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('screen');

export const Style = StyleSheet.create({
  container: (withBackground) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: withBackground ? colors.BLUE_MODAL_BACKGROUND : null,
  }),
  modal: {
    width: width * 0.8,
    height: height / 4,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  modalTextView: {
    flex: 1.5,
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
  modalbuttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: width * 0.3,
    height: height / 20,
    backgroundColor: colors.LIGHT_GRAY_BACKGROUND,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    color: colors.WHITE,
    fontSize: width / 23,
  },
  buttonCancelText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    color: colors.SECONDARY,
    fontSize: width / 23,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: '10%',
    justifyContent: 'flex-end',
  },
  modalTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    color: colors.SECONDARY,
    fontSize: width / 23,
  },
});
