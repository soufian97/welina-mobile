import { StyleSheet, Dimensions, Platform } from 'react-native';
import { IOS } from '../../config/app.constant';

const { width } = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goBackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width * 0.9,
    top: Platform.OS === IOS ? 35 : 5,
    marginBottom: 15,
    paddingBottom: 8,
  },
  icon: {
    padding: 15,
  },
});
