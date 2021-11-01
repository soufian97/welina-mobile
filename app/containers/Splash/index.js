import React, { useCallback, useEffect } from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import i18n from '../../config/i18n';
import { translation } from './messages';
import { Logo, RightArrow } from '../../assets/svgs';
import backgroundImage from '../../assets/images/splashBackground.webp';
import { Style } from './style';
import IconButton from '../../components/Buttons/IconButton';
import { routes } from '../../utils/navigation/routes';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  setDateToShoWFeedBackModal,
  hasNewNotification,
  openToast,
} from './store/actions.creator';
import { getBetaReminderDateSelector } from './store/selectors';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import homeReducerConfig from './store/reducer';
import homeSagaConfig from './store/saga';
import authReducerConfig from '../Auth/store/reducer';
import authSagaConfig from '../Auth/store/saga';
import { getCurrentUser } from '../Auth/store/selectors';
import {
  COACH,
  ERROR_MODAL,
  FEEDBACK_MODAL_STORAGE_KEY,
  SEE_PAST_EVENT_MODAL,
  SUCCESS,
} from '../../config/app.constant';
import { fcmService } from '../../utils/FCMService';
import { localNotificationService } from '../../utils/LocalNotificationService';
import addDays from 'date-fns/addDays';
import { openModal } from '../Modal/store/actions.creator';
import { getNotifications } from '../Notifications/store/actions.creator';
import notificationsSagaConfig from '../Notifications/store/saga';

const { width, height } = Dimensions.get('window');
const size = {
  radius: 10,
  width: width * 0.8,
  height: height * 0.064,
  font: 15,
};
export const Splash = ({
  navigation,
  currentUser,
  betaReminderDate,
  hasNewNotification,
  setDateToShoWFeedBackModal,
  openModal,
  openToast,
  getNotifications,
}) => {
  useInjectReducer(homeReducerConfig);
  useInjectSaga(homeSagaConfig);
  useInjectReducer(authReducerConfig);
  useInjectSaga(authSagaConfig);
  useInjectSaga(notificationsSagaConfig);

  const getNotificationsCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [openModal],
  );

  useEffect(() => {
    if (currentUser && currentUser?.hasUnSeenPastEvent && currentUser?.active) {
      openModal(SEE_PAST_EVENT_MODAL, { currentUser, navigation });
    }
  }, [openModal, currentUser, navigation]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.hasUnseenNotifications) {
        hasNewNotification();
      }
      fcmService.registerAppWithFCM();
      fcmService.register(
        onRegister,
        onNotification,
        onOpenNotification,
        currentUser.id,
      );
      localNotificationService.configure(onOpenNotificationConfigure);
      function onRegister(token) {}

      function onNotification(notify) {
        hasNewNotification();
        openToast({
          title: notify.title,
          body: notify.body,
          type: SUCCESS,
        });
        getNotifications({ page: 0 }, getNotificationsCallback);
        const options = {
          soundName: 'default',
          playSound: true,
        };

        localNotificationService.showNotification(
          0,
          notify.title,
          notify.body,
          notify,
          options,
        );
      }

      function onOpenNotificationConfigure(notify) {}
      function onOpenNotification(notify) {
        navigation.navigate(routes.NOTIFICATION);
      }
    }
  }, [
    navigation,
    currentUser,
    hasNewNotification,
    openToast,
    getNotifications,
    getNotificationsCallback,
  ]);

  const handleButtonPressed = useCallback(() => {
    if (!betaReminderDate) {
      setDateToShoWFeedBackModal(
        { key: FEEDBACK_MODAL_STORAGE_KEY, value: addDays(new Date(), 2) },
        () => {},
      );
    }
    currentUser?.type === COACH
      ? navigation.navigate(routes.COACH_DASHBOARD)
      : navigation.navigate(routes.DISCOVER);
  }, [betaReminderDate, currentUser, navigation, setDateToShoWFeedBackModal]);

  const getButtonTitle = () =>
    currentUser?.type === COACH
      ? i18n.t(translation.coachButtonTitle.id)
      : i18n.t(translation.buttonTitle.id);

  return (
    <ImageBackground style={Style.imageContainer} source={backgroundImage}>
      <View style={Style.viewContainer}>
        <View style={Style.headerContainer}>
          <Logo />
        </View>
        <View style={Style.bottomContainer}>
          <Text style={Style.title}>{i18n.t(translation.title.id)}</Text>
          <Text style={Style.description}>
            {i18n.t(translation.description.id)}
          </Text>
          <IconButton
            title={getButtonTitle()}
            icon={<RightArrow />}
            onPress={handleButtonPressed}
            right={true}
            size={size}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  betaReminderDate: getBetaReminderDateSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal,
      setDateToShoWFeedBackModal,
      hasNewNotification,
      openToast,
      getNotifications,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Splash);
