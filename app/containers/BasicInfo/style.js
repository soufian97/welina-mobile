import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { IOS } from '../../config/app.constant';
const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
    bottom: 10,
  },
  maps: {
    height: height * 1.1,
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    top: Platform.OS === IOS ? 70 : 50,
    marginHorizontal: width * 0.05,
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  basicInfoTextContainer: {
    alignSelf: 'flex-start',
  },
  basicInfoText: {
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
    fontWeight: '500',
    fontSize: 20,
    paddingLeft: 14,
    marginBottom: 10,
  },
  descriptionText: {
    backgroundColor: colors.WHITE,
    height: 300,
    width: width * 0.8,
    borderWidth: 1,
    borderColor: colors.PRIMARY_LOW_OPACITY,
    borderRadius: 5,
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    textAlignVertical: 'top',
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
  },
  socialMediaText: {
    backgroundColor: colors.WHITE,
    height: 50,
    width: width * 0.8,
    borderWidth: 1,
    borderColor: colors.PRIMARY_LOW_OPACITY,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
    marginBottom: 15,
  },
  galleryText: {
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
    fontSize: 17,
    alignSelf: 'flex-start',
    paddingLeft: width * 0.05,
  },
  backButton: {
    width: 50,
    height: 50,
  },
  filterIconContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  scrollContainer: {
    marginVertical: 20,
    borderRadius: 10,
  },
  experiencesContainer: {
    width: width * 0.9,
  },
  coverPicture: {
    backgroundColor: colors.WHITE,
    width: width * 0.8,
    height: height / 6,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPictureText: {
    fontFamily: 'Mulish',
    color: colors.GRAY_TEXT,
    paddingTop: 10,
    fontSize: 15,
  },
  profilePictures: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width * 0.8,
    height: height / 8,
    marginVertical: 15,
  },
  profilePicture: {
    backgroundColor: colors.WHITE,
    width: (width * 0.8) / 3 - 10,
    height: height / 8,
    alignSelf: 'center',
    marginHorizontal: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  surfExperienceText: {
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
    fontSize: 17,
    alignSelf: 'flex-start',
    paddingLeft: width * 0.05,
  },
  surfExperienceTextInput: {
    backgroundColor: colors.WHITE,
    height: 50,
    width: width * 0.8,
    borderWidth: 1,
    borderColor: colors.PRIMARY_LOW_OPACITY,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
    marginVertical: 15,
    marginLeft: width * 0.05,
  },
  countryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    height: 50,
    width: width * 0.4 - 10,
    borderWidth: 1,
    borderColor: colors.PRIMARY_LOW_OPACITY,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
    marginVertical: 15,
    marginLeft: width * 0.05,
    marginRight: 5,
  },
  countryCodeText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 16,
  },
  Container: {
    height: 50,
    fontFamily: 'Mulish',
    marginVertical: 15,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },
  addExperienceContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 10,
  },
  languagesContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 55,
    marginTop: 10,
    height: 50,
  },
  dropDownContainer: {
    backgroundColor: colors.WHITE,
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.PRIMARY_LOW_OPACITY,
    borderRadius: 5,
  },
  languagesText: {
    fontFamily: 'Mulish-Bold',
    color: colors.SECONDARY,
    fontSize: 17,
    alignSelf: 'flex-start',
    paddingLeft: width * 0.05,
  },
  coverImageContainer: {
    width: width * 0.8,
    height: height / 6,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY_BACKGROUND,
    justifyContent: 'center',
    marginBottom: 5,
  },
  radioIconContainer: {
    left: 20,
  },
  headerDrag: {
    height: height / 10,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Mulish-Bold',
    marginLeft: 20,
    fontSize: 15,
    color: colors.SECONDARY,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  headerRight: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childrenContainer: {
    marginLeft: 20,
    marginVertical: 10,
    width: '100%',
    alignSelf: 'flex-start',
  },
  childrenContainerCenter: {
    width: '100%',
    paddingBottom: 20,
  },
  uploadMainContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  uploadCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadSecondaryContainer: {
    width: '30%',
    height: height * 0.13,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY_BACKGROUND,
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '94%',
    marginTop: 5,
  },
  removeImageContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.BLACK_OPACITY,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageIcon: {
    color: colors.WHITE,
    fontFamily: 'Mulish-Bold',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.GRAY,
  },
  checkboxContainer: {
    width: '100%',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 10,
  },
  uploadContainer: {
    width: '100%',
    height: height * 0.35,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.SPLITTER,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textUpload: {
    fontFamily: 'Mulish',
    textAlign: 'center',
  },
  textError: {
    color: colors.RED,
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
    marginLeft: 5,
  },
  minusPlusFitIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.05,
  },
});