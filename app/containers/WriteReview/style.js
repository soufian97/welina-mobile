import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapsStyle: {
    height: height * 1.1,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 8,
  },
  firstQuestion: {
    justifyContent: 'center',
  },
  textRegular: {
    fontFamily: 'Mulish',
    fontSize: height * 0.01847,
    lineHeight: height * 0.02955,
    marginVertical: height * 0.03,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    borderWidth: 0.8,
    borderColor: colors.BLACK,
    margin: 2.5,
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 35,
  },
  texRadioButton: {
    marginHorizontal: 8,
  },
  textBoldTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.03,
    lineHeight: height * 0.0344,
    marginTop: height * 0.03348,
    marginBottom: height * 0.02,
  },
  textAreaInput: {
    height: height * 0.13,
    marginVertical: 15,
  },
  publicAnonymouslyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLayer: {
    position: 'absolute',
    top: 0,
    left: width * 0.05,
    right: 0,
    alignItems: 'center',
    bottom: 30,
    width: width * 0.9,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
