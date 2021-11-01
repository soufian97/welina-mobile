import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { Style } from './style';
import { translation } from './messages';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import i18n from '../../config/i18n';
import BookingCard from './components/BookingCard';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { getBookingList, cancelBookingList } from './store/actions.creator';

import {
  getBookingListSelector,
  getBookingListLoaderSelector,
  getIsLastPageSelector,
} from './store/selectors';
import { openModal } from '../Modal/store/actions.creator';
import bookingListReducerConfig from './store/reducer';
import bookingListSagaConfig from './store/saga';
import { BOOKING_STATUS, ERROR_MODAL } from '../../config/app.constant';
import { colors } from '../../utils/colors';
import { isEmpty } from 'lodash';
import LogoutPopup from '../DrawerMenu/components/LogoutPopup';
import FullScreenLoader from '../../components/FullScreenLoader';
import RenderNoData from '../../components/RenderNoData';

const tabs = [
  i18n.t(translation.upcoming.id),
  i18n.t(translation.past.id),
  i18n.t(translation.canceled.id),
];
const { height } = Dimensions.get('screen');

const BookingList = ({
  bookings,
  isLoading,
  isLastPage,
  getBookingList,
  cancelBookingList,
  navigation,
  route,
  openModal,
}) => {
  useInjectReducer(bookingListReducerConfig);
  useInjectSaga(bookingListSagaConfig);
  const [selectedTab, setSelectedTab] = useState(
    route.params?.pastEvent ? 1 : 0,
  );
  const [page, setPage] = useState(0);
  const [canceledReservationId, setCanceledReservationId] = useState(null);
  const [
    cancellationModalVisibility,
    setCancellationModalVisibility,
  ] = useState(false);

  const initialRegion = {
    latitude: 33.597739,
    longitude: -7.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
  const requestId = route.params?.requestId;
  const _map = useRef(null);
  const flatListRef = useRef(null);
  useEffect(() => {
    _map.current &&
      _map.current.animateToRegion(
        {
          ...initialRegion,
        },
        800,
      );
  });
  const getBookingListCallback = useCallback(
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

  const onPressTabHandler = useCallback(
    (index) => () => {
      !isEmpty(bookings) && flatListRef?.current?.scrollToIndex({ index: 0 });
      setPage(0);
      setSelectedTab(index);
    },
    [bookings],
  );

  const onCancelBookingCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        setCanceledReservationId(null);
      }
    },
    [openModal],
  );

  const onCancelBooking = useCallback(() => {
    if (canceledReservationId) {
      cancelBookingList(canceledReservationId, onCancelBookingCallback);
      setCancellationModalVisibility(false);
    }
  }, [cancelBookingList, canceledReservationId, onCancelBookingCallback]);

  const onPressCancelCancellation = useCallback(() => {
    setCancellationModalVisibility(false);
  }, []);

  const onPressCancel = useCallback(
    (id) => () => {
      setCanceledReservationId(id);
      setCancellationModalVisibility(true);
    },
    [],
  );

  const onEndReachedHandler = useCallback(() => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  }, [isLastPage, page]);

  const renderNoData = () => {
    return !isLoading ? (
      <RenderNoData
        title={i18n.t(translation.noResult.id)}
        description={i18n.t(translation.noResultDescription.id)}
      />
    ) : null;
  };

  const renderBookingCard = useCallback(
    ({ item }) => {
      return (
        <BookingCard
          item={item}
          navigation={navigation}
          onPressCancel={onPressCancel(item.id)}
        />
      );
    },
    [navigation, onPressCancel],
  );

  useEffect(() => {
    getBookingList(
      { page: page, status: BOOKING_STATUS[selectedTab] },
      getBookingListCallback,
    );
  }, [getBookingList, getBookingListCallback, page, selectedTab, requestId]);

  return (
    <View style={Style.screen}>
      <MapView
        ref={_map}
        style={Style.maps}
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={2}
        customMapStyle={mapsStyle}
      />
      <View style={Style.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={cancellationModalVisibility}
        >
          <LogoutPopup
            agreePressed={onCancelBooking}
            disagreePressed={onPressCancelCancellation}
            question={i18n.t(translation.cancelQuestion.id)}
            questionDetails={i18n.t(translation.cancelContent.id)}
          />
        </Modal>
        <GoBackHeader />
        <View style={Style.tabsContainer}>
          {tabs.map((_, index) => (
            <TouchableOpacity
              key={`${index}`}
              style={Style.tab(index === selectedTab)}
              onPress={onPressTabHandler(index)}
            >
              <Text style={Style.textTab(index === selectedTab)}>
                {tabs[index]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          style={Style.listStyle}
          data={bookings}
          keyExtractor={(_, index) => `${index}`}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={11}
          getItemLayout={(_, index) => ({
            length: height * 0.15,
            offset: height * 0.16 * index,
            index,
          })}
          renderItem={renderBookingCard}
          onEndReached={onEndReachedHandler}
          onScrollToIndexFailed={(info) => {
            const intervalId = (resolve) => setTimeout(resolve, 1000);
            const wait = new Promise((resolve) => intervalId(resolve));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
              clearTimeout(intervalId);
            });
          }}
          ListEmptyComponent={renderNoData}
          refreshing={isLoading}
        />
        {isLoading && page !== 0 && (
          <ActivityIndicator
            color={colors.PRIMARY}
            size={'large'}
            style={Style.activityIndicator}
          />
        )}
      </View>
      <FullScreenLoader visible={isLoading && page === 0} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  bookings: getBookingListSelector(),
  isLoading: getBookingListLoaderSelector(),
  isLastPage: getIsLastPageSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBookingList,
      cancelBookingList,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BookingList);
