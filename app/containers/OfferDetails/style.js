import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { IOS } from '../../config/app.constant';
const { width, height } = Dimensions.get('window');
const BANNER_H = 100;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapsStyle: {
    height: height * 1.1,
    position: 'absolute',
    width: width,
    zIndex: -1,
  },
  topLayer: (scrollA) => ({
    position: 'absolute',
    top: Platform.OS === IOS ? 200 : 180,
    bottom: 0,
    width: width * 0.9,
    height: Platform.OS === IOS ? height - 220 : height - 200,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: colors.WHITE,
    alignSelf: 'center',
    paddingVertical: 10,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [0, BANNER_H, BANNER_H + 1],
          outputRange: [0, -BANNER_H * 0.75, -BANNER_H * 0.75],
        }),
      },
    ],
  }),

  header: {
    position: 'absolute',
    flexDirection: 'row',
    top: Platform.OS === IOS ? 50 : 20,
    marginHorizontal: width * 0.05,
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingHorizontal: 15,
  },
  backButton: {
    width: 50,
    height: 50,
  },
  image: {
    paddingTop: 10,
    height: width * 0.9,
    borderRadius: 5,
  },
  basket: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    height: 80,
  },
  about: {
    padding: 10,
    marginBottom: 100,
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
  gradient: {
    height: width * 0.9,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: colors.WHITE,
    fontFamily: 'Mulish',
    marginLeft: 10,
  },
  dotContainerStyle: {
    top: 5,
    alignItems: 'flex-start',
  },
});
