import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: width * 0.85,
    height: height * 0.39,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width * 0.8,
  },
  feedbackIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: colors.PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
    marginVertical: 10,
  },
  textStyle: {
    fontFamily: 'Mulish',
    fontSize: height * 0.018,
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textIconContainer: {
    alignItems: 'center',
    height: '78%',
  },
});
