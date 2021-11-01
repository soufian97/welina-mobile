import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import { ArrowLeft, Send, Marker } from '../../assets/svgs';
import { Style } from './style';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import offersReducerConfig from './store/reducer';
import offersSagaConfig from './store/saga';
import detailsReducerConfig from '../OfferDetails/store/reducer';
import detailsSagaConfig from '../OfferDetails/store/saga';

import {
  getSessionsAndPackagesSelector,
  getIsLoadingDiscoverSelector,
  getIsLastPageSelector,
} from './store/selectors';
import { getSessionsAndPackagesByFilters } from './store/actions.creator';
import Details from './components/OfferDetails';
import {
  getSessionDetails,
  getPackageDetails,
} from '../OfferDetails/store/actions.creator';
import {
  getSessionDetailsSelector,
  getPackageDetailsSelector,
} from '../OfferDetails/store/selectors';
import { getCurrentUser } from '../Auth/store/selectors';
import { routes } from '../../utils/navigation/routes';
import { ERROR_MODAL, SESSION } from '../../config/app.constant';
import { isEmpty } from 'lodash';
import { translation } from './messages';
import { colors } from '../../utils/colors';
import RenderNoData from '../../components/RenderNoData';
import i18n from '../../config/i18n';
import { openModal } from '../Modal/store/actions.creator';

const { width, height } = Dimensions.get('window');

export const Offers = ({
  navigation,
  getSessionsAndPackagesByFilters,
  route,
  sessionsAndPackages,
  getSessionDetails,
  getPackageDetails,
  sessionDetails,
  packageDetails,
  currentUser,
  loading,
  isLastPage,
  openModal,
}) => {
  useInjectReducer(offersReducerConfig);
  useInjectSaga(offersSagaConfig);
  useInjectReducer(detailsReducerConfig);
  useInjectSaga(detailsSagaConfig);

  const [page, setPage] = useState(0);
  const { filters } = route.params;

  const CARD_WIDTH = width;
  const getCenterOffsetForAnchor = (anchor, markerWidth, markerHeight) => ({
    x: markerWidth * 0.5 - markerWidth * anchor.x,
    y: markerHeight * 0.5 - markerHeight * anchor.y,
  });

  const MARKER_WIDTH = 31;
  const MARKER_HEIGHT = 31;

  const ANCHOR = { x: 0.5, y: 0.5 };
  const CENTER_OFFSET = getCenterOffsetForAnchor(
    ANCHOR,
    MARKER_WIDTH,
    MARKER_HEIGHT,
  );

  const initialRegion = {
    latitude: 33.597739,
    longitude: -7.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };

  let mapAnimation = new Animated.Value(0);
  const _map = useRef(null);
  const flatListRef = useRef(null);

  const searchSessionsAndPackagesCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        if (sessionsAndPackages.length > 0) {
          flatListRef.current?.scrollToIndex({ animated: true, index: 0.01 });
        }
      }
    },
    [openModal, sessionsAndPackages.length],
  );
  const getOfferDetails = useCallback(
    ({ type }) => (type === SESSION ? sessionDetails : packageDetails),
    [packageDetails, sessionDetails],
  );

  useEffect(() => {
    getSessionsAndPackagesByFilters(
      { ...filters, page: page },
      searchSessionsAndPackagesCallback,
    );
  }, [
    filters,
    getSessionsAndPackagesByFilters,
    page,
    searchSessionsAndPackagesCallback,
  ]);

  useEffect(() => {
    mapAnimation.addListener(async ({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= sessionsAndPackages.length) {
        index = sessionsAndPackages.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      if (_map.current && sessionsAndPackages[index]) {
        const { latitude, longitude } = sessionsAndPackages[index].location;
        _map.current &&
          _map.current.animateToRegion(
            {
              latitude: latitude - 6,
              longitude,
              latitudeDelta: initialRegion.latitudeDelta,
              longitudeDelta: initialRegion.longitudeDelta,
            },
            800,
          );
      }
    });
  });

  const handleSessionsScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: mapAnimation,
          },
        },
      },
    ],
    { useNativeDriver: true },
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getDetailsCallback = useCallback(
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

  const cardPressedHandler = useCallback(
    (item) => () => {
      item.type === SESSION
        ? getSessionDetails(item.id, getDetailsCallback)
        : getPackageDetails(item.id, getDetailsCallback);
    },
    [getDetailsCallback, getPackageDetails, getSessionDetails],
  );

  const onPressBookHandler = (item) => () => {
    const params = {
      offerId: item.id,
      type: item.type,
      startDate: item.startDate,
      endDate: item.endDate,
      capacity: item.capacity,
      withKids: item.withKids,
    };
    if (!currentUser) {
      navigation.navigate(routes.AUTH, {
        intent: {
          route: routes.REQUEST_SESSION,
          params,
        },
      });
    } else {
      navigation.navigate(routes.REQUEST_SESSION, params);
    }
  };
  const onEndReachedHandler = useCallback(() => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  }, [isLastPage, page]);

  return (
    <View style={Style.container}>
      <MapView
        ref={_map}
        initialRegion={initialRegion}
        style={Style.mapsContainer}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapsStyle}
        maxZoomLevel={6}
      >
        {sessionsAndPackages.map((marker, index) => {
          const coordinate = {
            latitude: marker.location.latitude,
            longitude: marker.location.longitude,
          };
          const location = `${marker.location.city}, ${marker.location.country}`;
          return (
            <MapView.Marker
              key={index}
              coordinate={coordinate}
              centerOffset={CENTER_OFFSET}
              anchor={ANCHOR}
              flat={true}
            >
              <View style={Style.markerContainer}>
                <View style={Style.markerTitle}>
                  <View style={Style.iconStyle}>
                    <Send />
                  </View>
                  <Text style={Style.textStyle}>{location}</Text>
                </View>
                <Marker />
              </View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <TouchableOpacity style={Style.arrowLeftIcon} onPress={handleGoBack}>
        <ArrowLeft />
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator
          style={Style.loadingIndicator}
          size={'large'}
          color={colors.PRIMARY}
        />
      )}
      {!loading && isEmpty(sessionsAndPackages) ? (
        <RenderNoData
          title={i18n.t(translation.noOffers.id)}
          description={i18n.t(translation.noOffersDescription.id)}
          iconWidth={(2 * width) / 3}
          iconHeight={height / 3}
        />
      ) : (
        <Animated.FlatList
          horizontal
          ref={flatListRef}
          snapToInterval={CARD_WIDTH}
          bounces={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          data={sessionsAndPackages}
          style={Style.flatListStyle}
          keyExtractor={(_, index) => `${index}`}
          onEndReached={onEndReachedHandler}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <Details
              item={item}
              onCardPressed={cardPressedHandler(item)}
              offerDetails={getOfferDetails(item)}
              navigation={navigation}
              onPressBook={onPressBookHandler(item)}
            />
          )}
          onScroll={handleSessionsScroll}
          onScrollToIndexFailed={(info) => {
            const intervalId = (resolve) => setTimeout(resolve, 500);
            const wait = new Promise((resolve) => intervalId(resolve));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
              clearTimeout(intervalId);
            });
          }}
          windowSize={101}
        />
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  sessionsAndPackages: getSessionsAndPackagesSelector(),
  sessionDetails: getSessionDetailsSelector(),
  packageDetails: getPackageDetailsSelector(),
  currentUser: getCurrentUser(),
  loading: getIsLoadingDiscoverSelector(),
  isLastPage: getIsLastPageSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSessionsAndPackagesByFilters,
      getSessionDetails,
      getPackageDetails,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Offers);
