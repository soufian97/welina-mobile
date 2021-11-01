import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { height, width } = Dimensions.get('window');
export const Style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  maps: {
    height: height * 1.1,
    width,
  },
  container: {
    height,
    width,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tabsContainer: {
    width: width * 0.9,
    height: height * 0.0554,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
  },
  tab: (isSelected) => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25,
    height: height * 0.045,
    borderRadius: 24,
    backgroundColor: isSelected ? colors.BLUE_HIGH_OPACITY : colors.WHITE,
  }),
  textTab: (isSelected) => ({
    color: isSelected ? colors.BLUE : colors.BLUE_TEXT,
    fontFamily: 'Mulish-Bold',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  }),
  listStyle: {
    marginVertical: height * 0.04,
  },
  activityIndicator: {
    marginBottom: 18,
  },
  noResultContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: colors.SECONDARY,
    marginVertical: height * 0.04,
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
