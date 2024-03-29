import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { ANDROID } from '../../config/app.constant';
const { width, height } = Dimensions.get('window');

const contentText = {
  marginBottom: 30,
  fontFamily: 'Mulish',
  fontSize: 15,
  color: colors.SECONDARY,
  opacity: 0.5,
  fontWeight: '600',
};

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
    paddingTop: Platform.OS === ANDROID ? 20 : 45,
  },
  coverContainer: {
    marginTop: 10,
    height: height / 6,
    width: width * 0.9,
    paddingHorizontal: 10,
    paddingTop: 20,
    alignSelf: 'center',
    borderRadius: 30,
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: colors.GRAY,
  },
  imageButtonContainer: {
    height: 50,
    width: 50,
    backgroundColor: colors.WHITE_SMALL_OPACITY,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    height: height / 7,
    width: height / 7,
    top: -height / 14,
    borderColor: colors.WHITE,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  blurredProfile: {
    height: height / 7,
    width: height / 7,
    overflow: 'hidden',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY,
  },
  generalInfoContainer: {
    top: -height / 20,
    alignSelf: 'center',
  },
  fullNameText: {
    fontFamily: 'Mulish-Bold',
    fontSize: 20,
    color: colors.SECONDARY,
    shadowColor: colors.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    textAlign: 'center',
    left: 13,
  },
  coachTitle: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.SECONDARY,
    opacity: 0.5,
    left: -13,
  },
  locationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    color: colors.BLACK,
    opacity: 0.5,
    marginHorizontal: 10,
  },
  inputsContainer: {
    top: -height / 40,
  },
  inputLabel: {
    fontFamily: 'Mulish',
    fontSize: 19,
    color: colors.BLACK,
    fontWeight: '500',
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: colors.WHITE,
    height: 55,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  updateButton: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  nameAndUpdate: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  updateIcon: {
    width: 26,
    height: 26,
    left: 30,
    justifyContent: 'center',
  },
  coachBadgeIcon: {
    width: 26,
    height: 26,
    left: -13,
  },
  tabBar: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 0.058,
    width: width * 0.9,
    borderRadius: 24,
    backgroundColor: colors.WHITE,
    padding: 4,
  },
  tab: (backColor) => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.25,
    height: height * 0.045,
    borderRadius: 24,
    backgroundColor: backColor,
  }),
  textTab: (color) => ({
    color: color,
    fontFamily: 'Mulish-Bold',
  }),
  flatListContent: {
    marginTop: 10,
    paddingBottom: 10,
    height: '65%',
    paddingHorizontal: width * 0.05,
  },
  titleText: {
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
    fontSize: 20,
    marginBottom: 20,
  },
  itemQualification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dotIcon: {
    position: 'absolute',
    left: 0,
    top: 7,
  },
  contentText,
  itemText: {
    ...contentText,
    marginLeft: 15,
  },
  flatListElement: {
    width: width * 0.9,
  },
  toastStyle: {
    zIndex: 20,
  },
  offersContainer: {
    width: width * 0.9,
    alignItems: 'center',
  },
  createOfferButton: {
    alignSelf: 'center',
  },
  noResultContainer: {
    alignItems: 'center',
  },
  noResult: {
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
    color: colors.SECONDARY,
    marginBottom: height * 0.04,
  },
  overviewAndUpdate: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  galleryContainer: {
    width: width * 0.9,
    height: height * 0.345,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
  },
  galleryImage: {
    width: (width * 0.9) / 3 - 5,
    height: (height * 0.33) / 3,
    borderRadius: 15,
    marginHorizontal: 2,
    marginVertical: 2,
  },
});
