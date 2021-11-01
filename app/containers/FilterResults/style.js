import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { IOS } from '../../config/app.constant';
const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    height: height,
  },
  mapsContainer: {
    height: height * 1.1,
  },
  arrowLeftIcon: {
    position: 'absolute',
    top: Platform.OS === IOS ? 70 : 50,
    left: width * 0.05,
    height: 40,
    width: 40,
    justifyContent: 'center',
    zIndex: 1,
  },
  flatListStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    top: 0,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 40,
  },
  markerTitle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.DARK_HIGH_OPACITY,
    borderRadius: 5,
    height: 20,
    shadowColor: colors.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    paddingHorizontal: 5,
  },
  iconStyle: {
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultContainer: {
    position: 'absolute',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: colors.SECONDARY,
    marginBottom: height * 0.05,
  },
  noResultDescription: {
    position: 'relative',
    textAlign: 'center',
    paddingHorizontal: width / 6,
    fontFamily: 'Mulish',
    fontSize: 14,
    color: colors.SECONDARY,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
