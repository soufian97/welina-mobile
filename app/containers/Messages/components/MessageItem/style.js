import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height / 8,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageInfoContainer: {
    flex: 4.5,
  },
  messageInfoTopContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  messageInfoBottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contactName: {
    flex: 1,
    fontFamily: 'Mulish-Bold',
    fontSize: height / 50,
    color: colors.BLUE_DARK,
  },
  numberOfUnreadMessagesContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberOfUnreadMessagesText: {
    fontFamily: 'Mulish-Bold',
    fontSize: height / 60,
    color: colors.WHITE,
  },
  contactMessage: {
    flex: 2,
    fontFamily: 'Mulish',
    fontSize: height / 60,
    color: colors.BLUE_DARK,
  },
  contactLastTime: {
    flex: 1.5,
    fontFamily: 'Mulish',
    fontSize: height / 65,
    color: colors.GRAY_DARK_TEXT,
    textAlign: 'right',
  },
  deleteBox: {
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3,
    height: height / 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
