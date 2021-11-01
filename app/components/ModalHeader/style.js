import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export const Style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    height: 40,
    marginTop: 15,
  },
  textHeaderContainer: {
    alignItems: 'center',
    left: -35,
    flex: 1,
    zIndex: -1,
  },
  textHeader: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 15,
  },
  icon: {
    position: 'relative',
    left: 0,
    paddingHorizontal: 20,
    height: 70,
    width: 70,
    justifyContent: 'center',
  },
});
