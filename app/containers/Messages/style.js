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
  messagesText: {
    fontFamily: 'Mulish',
    color: colors.SECONDARY,
    fontWeight: '500',
    fontSize: 20,
    alignSelf: 'flex-start',
    paddingLeft: width * 0.1,
    marginVertical: 10,
  },
  messageSeparator: {
    height: 20,
  },
});
