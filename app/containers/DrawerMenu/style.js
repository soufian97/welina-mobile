import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { height, width } = Dimensions.get('window');

export const Style = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.GRAY,
  },
  containerRoot: {
    flex: 1,
    height: height,
    maxWidth: width,
  },
  nameAndProfile: {
    left: 10,
  },
  nameText: {
    fontFamily: 'Mulish-Bold',
    textTransform: 'capitalize',
    color: colors.WHITE,
    fontSize: 18,
    maxWidth: width * 0.7 - width / 8 - 60,
  },
  profileText: {
    fontFamily: 'Mulish',
    textTransform: 'capitalize',
    color: colors.WHITE,
    fontSize: width / 27,
    opacity: 0.8,
  },
  containerDrawer: {
    display: 'flex',
    flex: 2,
    justifyContent: 'center',
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10%',
  },
  containerLogout: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '10%',
    height: 40,
    width: width / 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.WHITE_BIG_OPACITY,
    justifyContent: 'space-evenly',
  },
  containerHeader: {
    flex: 1.5,
    alignItems: 'center',
    left: width / 8,
    flexDirection: 'row',
  },
  containerScreens: {
    left: width / 8,
    zIndex: 1,
  },
  numText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'Mulish',
    color: colors.WHITE,
  },
  versionText: {
    flex: 1,
    fontStyle: 'normal',
    fontFamily: 'Mulish',
    fontSize: width / 25,
    color: colors.WHITE,
  },
  logoutText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'Mulish',
    fontSize: width / 20,
    color: colors.WHITE,
  },
  drawerBackgroundStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: height,
    width: (2 * width) / 3,
  },
  disconnectIcon: {
    marginRight: '5%',
  },
  textItem: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'Mulish-Bold',
    color: colors.WHITE,
    fontSize: height / 50,
    marginLeft: '5%',
  },
  expandIconStyle: {
    top: -3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '15%',
    height: 30,
    width: 30,
  },
  itemContainer: {
    height: 30,
    flexDirection: 'row',
  },
  childDot: {
    marginLeft: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 6,
    width: 6,
    backgroundColor: colors.WHITE,
    borderRadius: 3,
  },
  childItem: {
    fontFamily: 'Mulish',
    fontSize: width / 29,
    marginLeft: '5%',
    color: colors.WHITE,
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundedIconContainer: {
    width: 66,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 7.5,
  },
  signInContainer: {
    backgroundColor: colors.WHITE_MEDIUM_OPACITY,
    width: width / 3,
    height: 40,
    left: -15,
    paddingLeft: 15,
    zIndex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  signInText: {
    fontFamily: 'Mulish-Bold',
    color: colors.WHITE,
    fontSize: height / 55,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    fontFamily: 'Mulish',
    color: colors.WHITE,
    fontSize: height / 57,
  },
  createAccountText: {
    fontFamily: 'Mulish',
    color: colors.BLUE_DARK,
    fontSize: height / 57,
    textDecorationLine: 'underline',
  },
  pendingStatusContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  hourglassStyle: {
    width: 30,
    height: 40,
    transform: [
      {
        rotate: '-20deg',
      },
    ],
  },
  shakaIconSize: {
    width: 45,
    height: 45,
  },
});
