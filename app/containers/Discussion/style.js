import { StyleSheet, Dimensions, Platform } from 'react-native';
import { IOS } from '../../config/app.constant';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapsStyle: {
    height: height * 1.1,
  },
  topLayer: {
    position: 'absolute',
    top: Platform.OS === IOS ? 100 : 80,
    bottom: 0,
    width,
    height: Platform.OS === IOS ? height - 120 : height - 100,
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    width: width,
    top: Platform.OS === IOS ? 50 : 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    // paddingHorizontal: 15,
  },
  backButton: {
    width: 50,
    height: 50,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  coachName: {
    flex: 1,
    zIndex: -1,
    height: 50,
    marginLeft: -50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coachNameText: {
    width: width - 100,
    color: colors.SECONDARY,
    fontFamily: 'Mulish',
    textAlign: 'center',
    fontSize: 18,
  },
  receiverType: {
    color: colors.SECONDARY,
    fontFamily: 'Mulish',
    textAlign: 'center',
    fontSize: 14,
  },
  secondaryText: {
    color: colors.SECONDARY,
    fontFamily: 'Mulish',
  },
  whiteText: {
    color: colors.WHITE,
    fontFamily: 'Mulish',
  },
  flexOne: {
    flex: 1,
  },
});
