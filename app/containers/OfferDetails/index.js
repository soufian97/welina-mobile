import React, { useEffect, useCallback } from 'react';
import { View, Dimensions, Animated, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import { Style } from './style';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Send, Marker, MapPin } from '../../assets/svgs';
import Button from '../../components/Buttons/Button';
import AboutOffer from '../../components/AboutOffer';
import AboutInstructor from '../../components/AboutInstructor';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import DetailsReducerConfig from './store/reducer';
import DetailsSagaConfig from './store/saga';
import { getSessionDetails, getPackageDetails } from './store/actions.creator';
import {
  getSessionDetailsSelector,
  getPackageDetailsSelector,
  getLoadingSelector,
} from './store/selectors';
import { isEmpty } from 'lodash';
import { routes } from '../../utils/navigation/routes';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import { getCurrentUser } from '../Auth/store/selectors';
import { ERROR_MODAL, SESSION } from '../../config/app.constant';
import { SliderBox } from 'react-native-image-slider-box';
import ProgressLoader from 'rn-progress-loader';
import {
  PACKAGE_NOT_EXIST,
  SESSION_NOT_EXIST,
} from '../../utils/http/errorCodes';
import i18n from '../../config/i18n';
import { translation } from './messages';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { openModal } from '../Modal/store/actions.creator';

const { width, height } = Dimensions.get('window');

export const Details = ({
  route,
  navigation,
  getSessionDetails,
  getPackageDetails,
  sessionDetails,
  packageDetails,
  currentUser,
  isLoading,
  openModal,
}) => {
  useInjectReducer(DetailsReducerConfig);
  useInjectSaga(DetailsSagaConfig);

  const item = route.params.item;
  const readOnly = route.params?.readOnly || false;
  const buttonTitle =
    route.params.buttonTitle || i18n.t(translation.bookNow.id);
  const coordinate = {
    latitude: item.location.latitude,
    longitude: item.location.longitude,
  };
  const buttonSize = {
    width: width / 4,
    height: height * 0.04,
    font: width / 35,
    radius: 10,
  };
  const initialRegion = {
    latitudeDelta: 0.4864195044303443,
    longitudeDelta: 0.40142817690068,
    latitude: item.location.latitude - 7,
    longitude: item.location.longitude,
  };

  let DetailsAnimation = new Animated.Value(0);

  const getDetailsCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
        if (
          [SESSION_NOT_EXIST, PACKAGE_NOT_EXIST].includes(err?.response?.code)
        ) {
          navigation.navigate(routes.DISCOVER);
        }
      }
    },
    [navigation, openModal],
  );

  useEffect(() => {
    item.type === SESSION
      ? getSessionDetails(item.id, getDetailsCallback)
      : getPackageDetails(item.id, getDetailsCallback);
  }, [getDetailsCallback, getPackageDetails, getSessionDetails, item]);

  const getOfferDetails = () =>
    item.type === SESSION ? sessionDetails : packageDetails;

  const handleDetailsScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: DetailsAnimation } } }],
    { useNativeDriver: true },
  );

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

  const onPressBookHandler = useCallback(() => {
    if (!currentUser) {
      navigation.navigate(routes.AUTH, {
        intent: {
          route: routes.REQUEST_SESSION,
          params: {
            offerId: item.id,
            startDate: item.startDate,
            endDate: item.endDate,
            type: item.type,
            capacity: item.capacity,
            withKids: item.withKids,
          },
        },
      });
    } else {
      navigation.navigate(routes.REQUEST_SESSION, {
        offerId: item.id,
        type: item.type,
        startDate: item.startDate,
        endDate: item.endDate,
        capacity: item.capacity,
        withKids: item.withKids,
      });
    }
  }, [currentUser, item, navigation]);

  const getLocation = () => {
    return `${item.location.city}, ${item.location.country}`;
  };

  return (
    <View style={Style.container}>
      <GoBackHeader />
      <MapView
        style={Style.mapsStyle}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        minZoomLevel={2}
        maxZoomLevel={6}
        customMapStyle={mapsStyle}
      >
        <MapView.Marker
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
              <Text
                style={Style.textStyle}
              >{`${item.location.city} ${item.location.country}`}</Text>
            </View>
            <Marker />
          </View>
        </MapView.Marker>
      </MapView>
      <Animated.View style={Style.topLayer(DetailsAnimation)}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleDetailsScroll}
          scrollEventThrottle={16}
        >
          <View>
            <SliderBox
              images={
                getOfferDetails()?.gallery
                  ? [getOfferDetails().photo, ...getOfferDetails().gallery]
                  : []
              }
              ImageComponentStyle={Style.image}
              resizeMode={'cover'}
              autoplay
              circleLoop
              dotColor={colors.PRIMARY_DARK}
              inactiveDotColor={colors.WHITE}
              paginationBoxStyle={Style.dotContainerStyle}
            />
            <LinearGradient
              colors={[colors.SECONDARY_FULL_OPACITY, colors.SECONDARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={Style.button}
            >
              <View style={Style.locationContainer}>
                <MapPin width={10} height={10} color={colors.WHITE} />
                <Text numberOfLines={1} style={Style.location}>
                  {getLocation()}
                </Text>
              </View>
              {!readOnly && (
                <Button
                  size={buttonSize}
                  title={buttonTitle}
                  onPress={onPressBookHandler}
                />
              )}
            </LinearGradient>
          </View>
          <View style={Style.about}>
            {!isEmpty(getOfferDetails()) && (
              <AboutOffer offer={getOfferDetails()} offerType={item.type} />
            )}
            {!isEmpty(getOfferDetails()) && (
              <AboutInstructor
                readOnly={readOnly}
                offer={getOfferDetails()}
                navigation={navigation}
                onPressBook={onPressBookHandler}
                item={item}
              />
            )}
          </View>
        </Animated.ScrollView>
      </Animated.View>
      <ProgressLoader
        visible={isLoading}
        isModal={true}
        isHUD={true}
        hudColor={colors.SECONDARY}
        color={colors.PRIMARY}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  sessionDetails: getSessionDetailsSelector(),
  packageDetails: getPackageDetailsSelector(),
  currentUser: getCurrentUser(),
  isLoading: getLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSessionDetails,
      getPackageDetails,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Details);
