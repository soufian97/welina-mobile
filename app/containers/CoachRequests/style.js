import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
const { width } = Dimensions.get('screen');

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COACH_BACKGROUND_COLOR,
    paddingHorizontal: width * 0.05,
  },
  receivingRequestsText: {
    fontFamily: 'Mulish',
    color: colors.BLUE_DARK,
    fontWeight: '600',
    fontSize: 24,
    marginBottom: '7%',
  },
});
