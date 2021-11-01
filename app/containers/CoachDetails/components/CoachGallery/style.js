import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  galleryContainer: {
    paddingVertical: 5,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.WHITE,
    backgroundColor: colors.WHITE_BACKGROUND,
    shadowColor: colors.BLACK,
  },
  imageCard: (columnSize) => ({
    width: (width * 0.889) / columnSize - 5,
    height: (height * 0.33) / columnSize,
    borderRadius: 15,
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: colors.GRAY,
  }),
  noResultContainer: {
    alignItems: 'center',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: colors.SECONDARY,
    marginBottom: height * 0.04,
  },
  noResultDescription: {
    position: 'relative',
    textAlign: 'center',
    paddingHorizontal: width / 6,
    fontFamily: 'Mulish',
    fontSize: 14,
    color: colors.SECONDARY,
  },
});

export default Style;
