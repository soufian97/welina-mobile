import { StyleSheet, Platform, Dimensions } from 'react-native';
import { IOS } from '../../config/app.constant';
const { height } = Dimensions.get('screen');

export const Style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    marginTop: Platform.OS === IOS ? 20 : 0,
  },
  bottomContainer: {
    marginBottom: 40,
    flex: 1,
  },
  activityIndicator: {
    marginTop: height * 0.4,
    alignSelf: 'center',
  },
});
