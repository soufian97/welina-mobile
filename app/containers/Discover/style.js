import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { IOS } from '../../config/app.constant';
const { height, width } = Dimensions.get('window');

export const Style = StyleSheet.create({
  config: {
    height: height * 1.1,
  },
  container: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 100,
  },
  topLayer: {
    height: '33%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === IOS ? 40 : 30,
  },
  outLine: (opacity) => ({
    width: 36,
    borderWidth: 2,
    borderColor: colors.ORANGE,
    position: 'absolute',
    bottom: 0,
    opacity,
  }),
  selectionDot: (opacity) => ({
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.SECONDARY,
    position: 'absolute',
    left: -2,
    top: 12,
    opacity,
  }),
  typeTitleComponent: (translateX, opacity) => ({
    justifyContent: 'center',
    width: width / 2,
    marginTop: 90,
    transform: [
      { rotate: '-90deg' },
      { translateY: -width / 4 + width / 12 },
      { translateX },
    ],
    opacity: opacity,
  }),
  typeTitle: {
    margin: 4,
    fontSize: height * 0.016,
    fontFamily: 'Mulish',
    fontWeight: '700',
  },
  card: {
    marginHorizontal: 6,
  },
  bottomLayer: {
    height: (2 * height) / 3,
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterContainer: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    flex: 5,
  },
  listRecent: {
    flex: 1,
    marginBottom: 35,
  },
  recentlyTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    height: height * 0.12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  seeAllText: {
    alignSelf: 'flex-end',
    marginRight: 25,
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
  },
  recentlyText: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.02,
    marginLeft: 6,
    color: colors.SECONDARY,
  },
  recentCard: {
    flex: 1,
    marginHorizontal: 6,
  },
  availableCardCustomAnimation: (opacity) => ({
    opacity,
  }),
  leftSideTextContainer: {
    height: 30,
  },
  availableCardsContainer: {
    height: height * 0.4,
    marginTop: 20,
  },
  noResultContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    left: -width / 12,
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: colors.SECONDARY,
    marginBottom: height * 0.04,
  },
  noResultDescription: {
    position: 'relative',
    textAlign: 'center',
    left: -width / 12,
    paddingHorizontal: width / 6,
    fontFamily: 'Mulish',
    fontSize: 14,
    color: colors.SECONDARY,
  },
  toastStyle: {
    zIndex: 20,
  },
});
