import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  contentContainer: {
    height: height * 0.0615,
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  textTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: 15,
    lineHeight: 18,
    color: colors.WHITE,
    marginRight: 20,
  },
});
