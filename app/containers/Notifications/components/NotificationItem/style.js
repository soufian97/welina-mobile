import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../utils/colors';

const { height } = Dimensions.get('window');
export const Style = StyleSheet.create({
  cardContainer: {
    marginVertical: 15,
  },
  cardTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  IconsContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  seenIcon: (seen) => ({
    width: height * 0.012,
    height: height * 0.012,
    backgroundColor: seen ? 'transparent' : colors.PRIMARY_DARK,
    borderRadius: (height * 0.012) / 2,
    marginRight: 8,
  }),
  textMessage: {
    width: '100%',
  },
  textTime: {
    marginTop: 10,
  },
  infoTextContainer: {
    width: '80%',
  },
});
