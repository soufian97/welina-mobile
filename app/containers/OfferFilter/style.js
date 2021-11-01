import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { IOS } from '../../config/app.constant';
const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    height: height,
  },
  maps: {
    height: height * 1.1,
    position: 'absolute',
    width: width,
    zIndex: -1,
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    top: Platform.OS === IOS ? height * 0.06 : 50,
    marginHorizontal: width * 0.05,
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  topLayer: {
    position: 'absolute',
    alignItems: 'center',
    height: Platform.OS === IOS ? height - 120 : height - 100,
    top: Platform.OS === IOS ? 120 : 100,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  numberOfPersons: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  containerDrag: {
    backgroundColor: colors.WHITE_BACKGROUND,
    width: width * 0.9,
    marginTop: height / 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.WHITE,
    alignItems: 'center',
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
  checkboxContainer: {
    width: '100%',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
});
