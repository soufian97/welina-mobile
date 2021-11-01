import { StyleSheet, Platform, Dimensions } from 'react-native';
import { IOS } from '../../config/app.constant';

const { width, height } = Dimensions.get('window');
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
  topLayer: {
    position: 'absolute',
    left: width * 0.05,
    right: 0,
    top: Platform.OS === IOS ? 100 : 80,
    alignItems: 'center',
    bottom: 30,
    width: width * 0.9,
    borderRadius: 10,
    overflow: 'hidden',
  },
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
  bottomContainer: {
    width: width * 0.9,
  },
  loader: { marginTop: height * 0.4 },
  offersContainer: {
    width: width * 0.9,
    height: height * 0.7,
  },
});
