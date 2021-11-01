import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  card: (scaleY) => ({
    width: height * 0.25,
    height: height * 0.35,
    borderRadius: 15,
    marginRight: 20,
    transform: [{ scaleY }],
  }),
  scaleInTop: (scaleY) => ({
    transform: [{ scaleY }],
    position: 'absolute',
    left: '10%',
    top: '5%',
  }),
  scaleInButton: (scaleY) => ({
    position: 'absolute',
    left: '5%',
    right: '5%',
    bottom: '2%',
    transform: [{ scaleY }],
  }),
  imageCard: {
    width: height * 0.25,
    height: height * 0.35,
    borderRadius: 15,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  name: {
    color: colors.WHITE,
    fontWeight: '500',
    fontSize: height * 0.02,
    marginVertical: 5,
    fontFamily: 'Roboto-Regular',
  },
  city: {
    color: colors.GRAY,
    fontWeight: '500',
    fontSize: height * 0.015,
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
});
