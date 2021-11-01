import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const { height } = Dimensions.get('window');
const Style = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.WHITE,
    width: height * 0.12,
    height: height * 0.12,
    maxHeight: 120,
    maxWidth: 120,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 27,
    width: '100%',
    padding: 2,
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    color: colors.WHITE,
    fontFamily: 'Roboto-Regular',
    fontSize: 6,
  },
  locationText: {
    color: colors.WHITE,
    fontFamily: 'Roboto-Regular',
    fontSize: 6,
  },
  gradient: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});

export default Style;
