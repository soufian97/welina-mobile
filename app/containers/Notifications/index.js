import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Notification from './components/NotificationItem';
import GoBackHeader from '../../components/Headers/GobackHeader';
import I18n from '../../components/I18n';
import i18n from '../../config/i18n';
import { translation } from './messages';
import { Style } from './style';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import {
  getNotificationsSelector,
  getNotificationsLoaderSelector,
  getIsLastPageSelector,
} from './store/selectors';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { getNotifications } from './store/actions.creator';
import { useState } from 'react';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import notificationsReducerConfig from './store/reducer';
import notificationsSagaConfig from './store/saga';
import { getCurrentUser } from '../Auth/store/selectors';
import FullScreenLoader from '../../components/FullScreenLoader';
import RenderNoData from '../../components/RenderNoData';
import { openModal } from '../Modal/store/actions.creator';
import { ERROR_MODAL } from '../../config/app.constant';
import { seenNewNotification } from '../Splash/store/actions.creator';

const Notifications = ({
  notifications,
  getNotifications,
  isLastPage,
  currentUser,
  isLoading,
  openModal,
  seenNewNotification,
}) => {
  useInjectReducer(notificationsReducerConfig);
  useInjectSaga(notificationsSagaConfig);
  const [page, setPage] = useState(0);

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
    seenNewNotification();
    getNotifications({ page: page }, getNotificationsCallback);
  }, [getNotifications, getNotificationsCallback, page, seenNewNotification]);

  const onEndReachedHandler = useCallback(() => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  }, [isLastPage, page]);

  return (
    <View style={Style.screen}>
      <GoBackHeader />
      <Text style={Style.textTitle}>
        <I18n {...translation.screenTitle} />
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => (
          <Notification {...item} userType={currentUser?.type} />
        )}
        onEndReached={onEndReachedHandler}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        ListEmptyComponent={
          <RenderNoData title={i18n.t(translation.noNotifications.id)} />
        }
        refreshing={isLoading}
      />
      <FullScreenLoader visible={isLoading && page === 0} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  notifications: getNotificationsSelector(),
  isLoading: getNotificationsLoaderSelector(),
  isLastPage: getIsLastPageSelector(),
  currentUser: getCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { openModal, getNotifications, seenNewNotification },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Notifications);
