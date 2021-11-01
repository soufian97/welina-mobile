import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification, id) => {
    this.checkPermission(onRegister, id);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister, id) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister, id);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {});
  };

  getToken = (onRegister, id) =>
    messaging()
      .subscribeToTopic(id)
      .then(() => {
        messaging()
          .getToken()
          .then((fcmToken) => {
            if (fcmToken) {
              onRegister(fcmToken);
            }
          })
          .catch((_error) => {});
      });

  unsubscribeFromTopic = (id) => id && messaging().unsubscribeFromTopic(id);

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {});
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {});
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
        // this.removeDeliveredNotification(notification.notificationId)
      }
    });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
          //  this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
