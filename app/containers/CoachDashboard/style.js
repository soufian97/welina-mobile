import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/colors';
const { width, height } = Dimensions.get('screen');
import { IOS } from '../../config/app.constant';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
    paddingTop: Platform.OS === IOS ? 50 : 20,
  },
  scrollViewContainer: {
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerWelcome: {
    fontFamily: 'Mulish',
    color: colors.GRAY_TEXT,
    fontSize: 24,
    fontWeight: '600',
    marginRight: 10,
  },
  coachFullName: {
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
    fontSize: 24,
    fontWeight: '600',
  },
  offerTitleContainer: {
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerTitle: {
    flexDirection: 'row',
  },
  offerTitleText: {
    fontFamily: 'Mulish-Bold',
    color: colors.BLUE_DARK,
    fontSize: 24,
    fontWeight: '600',
  },
  offerTitleNumber: {
    fontFamily: 'Mulish-Bold',
    color: colors.PRIMARY,
    fontSize: 24,
    fontWeight: '600',
  },
  seeAllText: {
    fontFamily: 'Mulish-Bold',
    color: colors.BLUE_DARK,
    fontSize: 14,
  },
  noDataContainer: {
    flexDirection: 'row',
    height: height / 5,
    width: width * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
  },
  noDataIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noDataTitle: {
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
    fontSize: height / 45,
  },
  noDataBody: {
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
    fontSize: height / 60,
  },
});
