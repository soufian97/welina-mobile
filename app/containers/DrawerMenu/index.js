import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { translation } from './messages';
import { Style } from './style';
import i18n from '../../config/i18n';
import {
  BookingsIcon,
  CalendarIcon,
  LogoutIcon,
  DisableAccountIcon,
  CoachIcon,
  ContactUsIcon,
  RoundedLogoIcon,
  SignInIcon,
  HomeIcon,
  PlusFitIcon,
  GiftIcon,
  PastEventsIcon,
  HelpIcon,
} from '../../assets/svgs';
import anonymous from '../../assets/images/avatar.png';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../Auth/store/selectors';
import {
  logoutUser,
  disableAccount,
  activateAccount,
  checkCurrent,
} from '../Auth/store/actions.creator';
import {
  openModalAction,
  closeModalPastEvents,
  openBetaTestModalAction,
  setDateToShoWFeedBackModal,
  getDateToShoWFeedBackModal,
} from '../Splash/store/actions.creator';
import { routes } from '../../utils/navigation/routes';
import I18n from '../../components/I18n';
import {
  PENDING,
  COACH,
  LOCALHOST_LINK,
  FEEDBACK_MODAL_STORAGE_KEY,
  BETA_TEST_REMINDER_MODAL,
  DEACTIVATION_MODAL,
  LOGOUT_MODAL,
  ERROR_MODAL,
} from '../../config/app.constant';
import hourglass from '../../assets/images/hourglass.png';
import { fcmService } from '../../utils/FCMService';
import { API_URL } from '../../utils/http/http';
import { colors } from '../../utils/colors';
import {
  getBetaTestModalVisibilitySelector,
  getHomeLoaderSelector,
  getBetaReminderDateSelector,
  getHasNewNotificationState,
} from '../Splash/store/selectors';
import BetaTestFeedback from '../../components/BetaTestFeedback';
import { addDays, isAfter, parseISO } from 'date-fns';
import { openModal, closeModal } from '../Modal/store/actions.creator';
import NotificationBell from './components/NotificationBell';

const { width } = Dimensions.get('screen');

export const DrawerMenu = ({
  navigation,
  currentUser,
  logoutUser,
  disableAccount,
  activateAccount,
  checkCurrent,
  betaTestModalVisibility,
  openBetaTestModalAction,
  setDateToShoWFeedBackModal,
  getDateToShoWFeedBackModal,
  betaReminderDate,
  openModal,
  closeModal,
  hasNewNotificationState,
}) => {
  const [betaTestFeedBackVisibility, setBetaTestFeedBackVisibility] = useState(
    false,
  );

  useEffect(() => {
    if (betaTestModalVisibility) {
      setTimeout(() => setBetaTestFeedBackVisibility(true), 500);
    } else {
      setBetaTestFeedBackVisibility(false);
    }
  }, [betaTestModalVisibility]);

  const deactivateAccountCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        navigation.navigate(routes.SPLASH);
      }
    },
    [navigation, openModal],
  );

  const activateAccountCallback = useCallback(() => {
    navigation.navigate(
      currentUser?.type === COACH ? routes.COACH_DASHBOARD : routes.DISCOVER,
    );
  }, [currentUser, navigation]);
  const actionAccountCallback = useCallback(
    (err) => {
      if (!err) {
        checkCurrent(activateAccountCallback);
      }
    },
    [checkCurrent, activateAccountCallback],
  );

  const handleAgreePressed = useCallback(() => {
    closeModal();
    if (currentUser) {
      currentUser.active
        ? disableAccount(deactivateAccountCallback)
        : activateAccount(actionAccountCallback);
    }
  }, [
    closeModal,
    currentUser,
    disableAccount,
    deactivateAccountCallback,
    activateAccount,
    actionAccountCallback,
  ]);

  const onPressDisableAccount = useCallback(() => {
    openModal(DEACTIVATION_MODAL, {
      status: currentUser?.active,
      agreePressed: handleAgreePressed,
      disagreePressed: closeModal,
      currentUser: currentUser,
    });
  }, [currentUser, handleAgreePressed, closeModal, openModal]);

  useEffect(() => {
    currentUser && !currentUser.active && onPressDisableAccount();
  }, [currentUser, onPressDisableAccount]);

  useEffect(() => {
    currentUser && !currentUser.active && onPressDisableAccount();
  }, [currentUser, onPressDisableAccount]);

  const onPressStartBetaTestCallback = useCallback(
    (err) => {
      if (!err) {
        if (currentUser) {
          closeModal();
          openBetaTestModalAction();
        } else {
          navigation.navigate(routes.AUTH);
          closeModal();
        }
      }
    },
    [closeModal, currentUser, navigation, openBetaTestModalAction],
  );

  const onPressStartBetaTest = useCallback(() => {
    setDateToShoWFeedBackModal(
      { key: FEEDBACK_MODAL_STORAGE_KEY, value: addDays(new Date(), 2) },
      onPressStartBetaTestCallback,
    );
  }, [onPressStartBetaTestCallback, setDateToShoWFeedBackModal]);

  const onPressBetaTestLater = useCallback(() => {
    setDateToShoWFeedBackModal(
      { key: FEEDBACK_MODAL_STORAGE_KEY, value: addDays(new Date(), 1) },
      closeModal,
    );
  }, [closeModal, setDateToShoWFeedBackModal]);

  const getDateToShoWFeedBackModalCallback = useCallback(() => {
    if (betaReminderDate && isAfter(new Date(), parseISO(betaReminderDate))) {
      openModal(BETA_TEST_REMINDER_MODAL, {
        agreePressed: onPressStartBetaTest,
        disagreePressed: onPressBetaTestLater,
      });
    }
  }, [betaReminderDate, onPressBetaTestLater, onPressStartBetaTest, openModal]);

  useEffect(() => {
    getDateToShoWFeedBackModal(
      { key: FEEDBACK_MODAL_STORAGE_KEY },
      getDateToShoWFeedBackModalCallback,
    );
  }, [getDateToShoWFeedBackModal, getDateToShoWFeedBackModalCallback]);

  const handleApplyAsACoachRoute = () =>
    currentUser?.applicationStatus === PENDING
      ? routes.PENDING_PAGE
      : routes.BASIC_INFO;

  const menuDrawerSurferContent = [
    {
      icon: <HomeIcon />,
      title: i18n.t(translation.home.id),
      route: routes.DISCOVER,
      secure: false,
    },
    {
      icon: <BookingsIcon />,
      title: i18n.t(translation.bookings.id),
      route: routes.BOOKING_LIST,
      secure: true,
    },
    {
      icon: (
        <NotificationBell hasNewNotificationState={hasNewNotificationState} />
      ),
      title: i18n.t(translation.notifications.id),
      route: routes.NOTIFICATION,
      secure: true,
    },
    {
      icon: <ContactUsIcon />,
      title: i18n.t(translation.contactUs.id),
      route: routes.CONTACT_US,
      secure: false,
    },
    {
      icon: <DisableAccountIcon />,
      title: i18n.t(translation.desactivateAccount.id),
      action: onPressDisableAccount,
      secure: true,
    },
    currentUser?.isBetaTester && {
      icon: <GiftIcon />,
      title: i18n.t(translation.becomaATester.id),
      action: openBetaTestModalAction,
      secure: true,
    },
    {
      icon: <CoachIcon />,
      title: i18n.t(translation.applyAsAcCoach.id),
      route: handleApplyAsACoachRoute(),
      secure: true,
    },
    {
      icon: <HelpIcon />,
      title: i18n.t(translation.helpCenter.id),
      route: routes.FAQ,
      secure: false,
    },
  ];

  const menuDrawerCoachContent = [
    {
      icon: <HomeIcon />,
      title: i18n.t(translation.home.id),
      route: routes.COACH_DASHBOARD,
      secure: false,
    },
    {
      icon: (
        <NotificationBell hasNewNotificationState={hasNewNotificationState} />
      ),
      title: i18n.t(translation.notifications.id),
      route: routes.NOTIFICATION,
      secure: true,
    },
    {
      icon: <PlusFitIcon color={colors.WHITE} />,
      title: i18n.t(translation.addOffer.id),
      route: routes.ADD_OFFER,
      secure: true,
    },
    {
      icon: <ContactUsIcon />,
      title: i18n.t(translation.contactUs.id),
      route: routes.CONTACT_US,
      secure: false,
    },
    {
      icon: <DisableAccountIcon />,
      title: i18n.t(translation.desactivateAccount.id),
      action: onPressDisableAccount,
      secure: true,
    },
    {
      icon: <CalendarIcon />,
      title: i18n.t(translation.myScheduled.id),
      route: routes.COACH_SCHEDULE,
      secure: true,
    },
    {
      icon: <PastEventsIcon />,
      title: i18n.t(translation.myPastEvents.id),
      route: routes.COACH_PASTE_EVENTS,
      secure: true,
    },
    currentUser?.isBetaTester && {
      icon: <GiftIcon />,
      title: i18n.t(translation.becomaATester.id),
      action: openBetaTestModalAction,
      secure: true,
    },
    {
      icon: <HelpIcon />,
      title: i18n.t(translation.helpCenter.id),
      route: routes.FAQ,
      secure: false,
    },
  ];

  const getFullName = () => {
    return currentUser
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : null;
  };

  const logoutUserCallback = useCallback(
    (err) => {
      if (err) {
        openModalAction(err?.response?.code);
      } else {
        navigation.navigate(routes.SPLASH);
      }
    },
    [navigation],
  );

  const handleLogoutUser = useCallback(() => {
    fcmService.unsubscribeFromTopic(currentUser?.id);
    logoutUser(logoutUserCallback);
    closeModal();
  }, [closeModal, currentUser, logoutUser, logoutUserCallback]);

  const handleCloseLogoutPopup = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleLogoutPressed = useCallback(() => {
    navigation.closeDrawer();
    openModal(LOGOUT_MODAL, {
      textAgree: i18n.t(translation.logOut.id),
      agreePressed: handleLogoutUser,
      disagreePressed: handleCloseLogoutPopup,
      withBackground: false,
    });
  }, [handleCloseLogoutPopup, handleLogoutUser, navigation, openModal]);

  const handleMenuItemPressed = useCallback(
    (route, secure, action) => () => {
      if (action) {
        navigation.closeDrawer();
        action();
      }
      if (route) {
        if ((secure && currentUser) || !secure) {
          navigation.navigate(route);
        } else {
          navigation.navigate(routes.AUTH, {
            intent: { route },
          });
        }
      }
    },
    [currentUser, navigation],
  );

  const handleSignIn = useCallback(() => {
    navigation.navigate(routes.AUTH, {
      intent: { route: routes.SPLASH },
    });
  }, [navigation]);

  const handleSignUp = useCallback(() => {
    navigation.navigate(routes.AUTH, {
      intent: { route: routes.SPLASH },
      selectedInterval: width,
    });
  }, [navigation]);

  const getAvatarImage = () =>
    currentUser
      ? { uri: currentUser?.photo?.replace(LOCALHOST_LINK, API_URL) }
      : anonymous;

  const handleVisitProfile = () => {
    const profileRoute =
      currentUser?.type === COACH ? routes.COACH_PROFILE : routes.UPDATE_INFO;
    navigation.navigate(profileRoute);
  };

  const getAvatar = () => (
    <TouchableOpacity
      style={Style.containerHeader}
      onPress={handleVisitProfile}
    >
      <Image style={Style.image} source={getAvatarImage()} />
      <View style={Style.nameAndProfile}>
        <Text style={Style.nameText}>{getFullName()}</Text>
        {getUserStatus()}
      </View>
    </TouchableOpacity>
  );

  const getLogoAndLinkToAuth = () => {
    return (
      <View style={Style.containerHeader}>
        <View style={Style.headerContainer}>
          <View style={Style.roundedIconContainer}>
            <RoundedLogoIcon />
          </View>
          <TouchableOpacity
            style={Style.signInContainer}
            onPress={handleSignIn}
          >
            <SignInIcon />
            <Text style={Style.signInText}>
              <I18n {...translation.signIn} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getHeaderMenu = () => {
    return currentUser ? getAvatar() : getLogoAndLinkToAuth();
  };

  const logoutContainer = () => (
    <TouchableOpacity
      style={Style.containerLogout}
      onPress={handleLogoutPressed}
    >
      <LogoutIcon />
      <Text style={Style.logoutText}>{i18n.t(translation.logOut.id)}</Text>
    </TouchableOpacity>
  );

  const getLinkToSignUp = () => {
    return (
      <View style={Style.createAccountContainer}>
        <Text style={Style.noAccountText}>
          <I18n {...translation.noAccount} />
        </Text>
        <Text style={Style.createAccountText} onPress={handleSignUp}>
          <I18n {...translation.createOne} />
        </Text>
      </View>
    );
  };
  const getFooterMenu = () => {
    return (
      <View style={Style.containerDrawer}>
        {currentUser ? logoutContainer() : getLinkToSignUp()}
      </View>
    );
  };

  const getPendingStatus = () => {
    return (
      <View style={Style.pendingStatusContainer}>
        <Image
          source={hourglass}
          width={30}
          height={40}
          style={Style.hourglassStyle}
        />
        <Text style={Style.profileText}>
          <I18n {...translation.applicationPending} />
        </Text>
      </View>
    );
  };
  const getUserStatus = () => {
    return currentUser ? (
      currentUser.applicationStatus === PENDING ? (
        getPendingStatus()
      ) : (
        <Text style={Style.profileText}>{currentUser.type}</Text>
      )
    ) : null;
  };

  const getDrawerMenuContent = () =>
    currentUser?.type === COACH
      ? menuDrawerCoachContent
      : menuDrawerSurferContent;

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={betaTestFeedBackVisibility}
      >
        <BetaTestFeedback navigation={navigation} />
      </Modal>
      <View style={Style.containerRoot}>
        {getHeaderMenu()}
        <View style={Style.containerScreens}>
          {getDrawerMenuContent().map((value) => {
            if (value) {
              const { icon, title, route, secure, action } = value;
              return (!currentUser && !secure) || currentUser ? (
                <View key={title}>
                  <TouchableOpacity
                    style={[
                      Style.containerItem,
                      { backgroundColor: 'transparent' },
                    ]}
                    onPress={handleMenuItemPressed(route, secure, action)}
                  >
                    <View style={Style.icon}>{icon}</View>
                    <Text style={Style.textItem}>{title}</Text>
                  </TouchableOpacity>
                  <View style={Style.separator} />
                </View>
              ) : null;
            }
          })}
        </View>
        {getFooterMenu()}
      </View>
    </DrawerContentScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  betaTestModalVisibility: getBetaTestModalVisibilitySelector(),
  loading: getHomeLoaderSelector(),
  betaReminderDate: getBetaReminderDateSelector(),
  hasNewNotificationState: getHasNewNotificationState(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logoutUser,
      disableAccount,
      activateAccount,
      checkCurrent,
      closeModalPastEvents,
      openBetaTestModalAction,
      setDateToShoWFeedBackModal,
      getDateToShoWFeedBackModal,
      openModal,
      closeModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DrawerMenu);
