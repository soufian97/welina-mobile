import Geolocation from 'react-native-geolocation-service';
import {
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Alert,
} from 'react-native';
import { translation } from '../containers/Home/messages';
import i18n from '../config/i18n';
import { IOS, ANDROID } from '../config/app.constant';

export const requestLocationPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert(i18n.t(translation.unableOpenSettings.id));
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert(i18n.t(translation.locationPermissionDenied.id));
  }

  if (status === 'disabled') {
    Alert.alert(i18n.t(translation.turnOnLocationService.id), '', [
      {
        text: i18n.t(translation.goToSettings.id),
        onPress: openSetting,
      },
      {
        text: i18n.t(translation.dontUseLocation.id),
        onPress: () => {},
      },
    ]);
  }
  return false;
};

const hasLocationPermissionIOS = () => {
  Geolocation.requestAuthorization('whenInUse');
  return true;
};
export const hasLocationPermissions = async () => {
  if (Platform.OS === IOS) {
    const hasPermission = hasLocationPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === ANDROID && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(i18n.t(translation.locationDenied.id), ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      i18n.t(translation.locationRevoked.id),
      ToastAndroid.LONG,
    );
  }

  return false;
};
