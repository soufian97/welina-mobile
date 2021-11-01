import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');

export const Style = StyleSheet.create({
  contentContainer: {
    width: width / 4.5,
    height: height / 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  textTitle: (selected) => ({
    fontFamily: 'Mulish',
    fontSize: 12,
    fontWeight: '400',
    color: selected ? colors.WHITE : colors.GRAY_DARK,
  }),
  buttonBorder: {
    width: width / 4.5,
    height: height / 20,
    borderRadius: 10,
    borderColor: colors.LIGHT_GRAY,
    borderWidth: 0.5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
