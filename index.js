import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import Navigator from './app/utils/navigation/navigation';
import './app/config/i18n';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './app/config/configureStore';
import { NavigationContainer } from '@react-navigation/native';
import Modal from './app/containers/Modal';
import Toast from 'react-native-toast-message';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <NavigationContainer>
      <Navigator />
      <Modal />
    </NavigationContainer>
    <Toast style={Style.toastStyle} ref={(ref) => Toast.setRef(ref)} />
  </Provider>
));

const Style = StyleSheet.create({
  toastStyle: {
    zIndex: 999999999999,
  },
});
