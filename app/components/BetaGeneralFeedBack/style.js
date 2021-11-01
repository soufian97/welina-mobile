import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

const dismissDiameter = height * 0.035;
export const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    height: height * 0.34,
    width: width * 0.88,
    marginHorizontal: width * 0.06,
    backgroundColor: colors.WHITE_BACKGROUND,
    borderRadius: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  dismissButton: {
    position: 'absolute',
    top: 10,
    right: 16,
    width: dismissDiameter,
    height: dismissDiameter,
    borderRadius: dismissDiameter / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDismissIcon: {
    fontWeight: 'bold',
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.85,
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 8,
  },
  emoji: {
    width: width * 0.18,
    height: width * 0.18,
  },
  emojiWrapper: {
    width: width * 0.15,
    height: width * 0.15,
    overflow: 'hidden',
    borderRadius: (width * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiBackground: {
    backgroundColor: colors.PRIMARY_DARK,
  },
  textTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: height * 0.018,
    marginVertical: 20,
    width: '80%',
    textAlign: 'center',
  },
});
