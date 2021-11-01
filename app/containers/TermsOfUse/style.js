import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: height,
    width,
  },
  viewContainer: {
    backgroundColor: colors.SECONDARY_OPACITY,
    width,
    height,
    flex: 1,
  },
  arrowLeftStyle: {
    marginTop: 15,
    marginLeft: 18,
    height: height * 0.1,
    justifyContent: 'center',
    zIndex: 1,
  },
  textTitle: (textColor) => ({
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.03,
    color: textColor,
  }),
  textDescription: (textColor) => ({
    fontFamily: 'Mulish',
    fontSize: height * 0.018,
    color: textColor,
    marginVertical: 10,
    textAlign: 'justify',
  }),
  textSubTitle: (textColor) => ({
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.02,
    color: textColor,
    textAlign: 'justify',
  }),
  textList: {
    marginTop: -6,
    marginLeft: 8,
    width: '90%',
  },
  dot: (textColor) => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: textColor,
  }),
  listContainer: {
    marginLeft: 25,
    flexDirection: 'row',
    marginVertical: 9,
  },
  scrollContent: {
    width: '90%',
    alignSelf: 'center',
  },
});
