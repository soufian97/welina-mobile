import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { height, width } = Dimensions.get('window');

export const Styles = StyleSheet.create({
  card: (scaleY) => ({
    width: height * 0.25,
    height: height * 0.35,
    borderRadius: 15,
    marginRight: 20,
    transform: [{ scaleY }],
    backgroundColor: colors.GRAY,
  }),
  container: {
    width: height * 0.25,
    height: height * 0.35,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  btn: {
    width: width / 6,
    height: height * 0.03,
    borderRadius: 10,
    marginTop: 16,
  },
  textContainer: {
    height: 20,
    marginBottom: -10,
  },
  textBottomContainer: {
    height: 20,
    width: '50%',
  },
  textLocationContainerBottom: {
    height: 16,
    marginBottom: 10,
  },
});
