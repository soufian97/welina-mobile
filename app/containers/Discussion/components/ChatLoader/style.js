import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  item: (width) => ({
    height: 45,
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: 'flex-end',
    width: width,
  }),
});
