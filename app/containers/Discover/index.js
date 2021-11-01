import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { Style } from './style';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import {
  getAvailableSessions,
  getRecentSessions,
  getAvailablePackages,
  getRecentPackages,
} from './store/actions.creator';

import {
  getAvailableSessionsSelector,
  getRecentsSessionsSelector,
  getAvailablePackagesSelector,
  getRecentPackagesSelector,
  getIsLoadingDiscoverSelector,
  isLastRecentSessionsPage,
  isLastAvailablePackagesPage,
  isLastRecentPackagesPage,
  isLastAvailableSessionsPage,
} from './store/selectors';
import discoverReducerConfig from './store/reducer';
import discoverSagaConfig from './store/saga';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import {
  View,
  Animated,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import i18n from '../../config/i18n';
import I18n from '../../components/I18n';
import { translation } from './messages';
import AvailableItemCard from '../../components/AvailableItemCard';
import AvailableItemCardSkeleton from '../../components/AvailableItemCardSkeleton';
import Header from '../../components/Headers/Header';
import SearchBar from '../../components/SearchBar';
import MenuBar from './components/MenuBar';
import CardRecently from '../../components/CardRecently';
import { FilterIcon } from '../../assets/svgs';
import { routes } from '../../utils/navigation/routes';
import { getCurrentUser } from '../Auth/store/selectors';
import { isEmpty } from 'lodash';
import RenderNoData from '../../components/RenderNoData';
import { ERROR_MODAL } from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';

const { height, width } = Dimensions.get('window');

export const Discover = ({
  recentsSessions,
  recentPackages,
  availableSessions,
  availablePackages,
  isLoading,
  getRecentSessions,
  getRecentPackages,
  getAvailableSessions,
  getAvailablePackages,
  navigation,
  currentUser,
  lastAvailableSessions,
  lastRecentSessions,
  lastAvailablePackages,
  lastRecentPackages,
  openModal,
}) => {
  useInjectReducer(discoverReducerConfig);
  useInjectSaga(discoverSagaConfig);

  const initialPages = useMemo(() => {
    return {
      availablePackagesPage: 0,
      recentPackagesPage: 0,
      availableSessionsPage: 0,
      recentSessionsPage: 0,
    };
  }, []);

  const [selectedType, setSelectedType] = useState(0);
  const [location, setLocation] = useState('');
  const [pages, setPages] = useState(initialPages);
  const cardSize = height * 0.25 + 20;
  const flatListRef = useRef();
  const _map = useRef();

  const initialRegion = {
    latitude: 33.597739,
    longitude: -7.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };

  const typeTranslation = useRef(new Animated.Value(0)).current;

  const translateTop = typeTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: selectedType ? [0, 160] : [0, -123],
  });

  const translateBottom = typeTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: selectedType ? [0, -123] : [0, 160],
  });

  const selectedOpacity = typeTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const notSelectedOpacity = typeTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4],
  });

  const opacityVisible = typeTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const opacityHidden = typeTranslation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const availableCardAnimation = useRef(new Animated.Value(0));

  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const isSelected = (selected) =>
    selectedType === selected ? translateTop : translateBottom;

  const getItemsCallback = useCallback(
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
    !selectedType &&
      getAvailableSessions(
        { page: pages.availableSessionsPage, location },
        getItemsCallback,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAvailableSessions,
    getItemsCallback,
    pages.availableSessionsPage,
    selectedType,
  ]);

  useEffect(() => {
    !selectedType &&
      getRecentSessions(
        { page: pages.recentSessionsPage, location },
        getItemsCallback,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pages.recentSessionsPage,
    getItemsCallback,
    getRecentSessions,
    selectedType,
  ]);

  useEffect(() => {
    selectedType &&
      getAvailablePackages(
        { page: pages.availablePackagesPage, location },
        getItemsCallback,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAvailablePackages,
    pages.availablePackagesPage,
    getItemsCallback,
    selectedType,
  ]);

  useEffect(() => {
    selectedType &&
      getRecentPackages(
        { page: pages.recentPackagesPage, location },
        getItemsCallback,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pages.recentPackagesPage,
    getItemsCallback,
    getRecentPackages,
    selectedType,
  ]);

  useEffect(() => {
    _map.current &&
      _map.current.animateToRegion(
        {
          ...initialRegion,
        },
        800,
      );
  });

  useEffect(() => {
    Animated.parallel([
      Animated.spring(typeTranslation, {
        toValue: selectedType,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: isLoading ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isLoading, opacityAnimation, selectedType, typeTranslation]);

  const onSearchByLocationActive = useCallback(
    (keySearch) => {
      if (!selectedType) {
        getAvailableSessions(
          { page: pages.availableSessionsPage, location: keySearch.trim() },
          getItemsCallback,
        );
        getRecentSessions(
          { page: pages.recentSessionsPage, location: keySearch.trim() },
          getItemsCallback,
        );
      } else {
        getAvailablePackages(
          { page: pages.availablePackagesPage, location: keySearch.trim() },
          getItemsCallback,
        );
        getRecentPackages(
          { page: pages.recentPackagesPage, location: keySearch.trim() },
          getItemsCallback,
        );
      }
    },
    [
      getAvailablePackages,
      getAvailableSessions,
      getItemsCallback,
      getRecentPackages,
      getRecentSessions,
      pages.availablePackagesPage,
      pages.availableSessionsPage,
      pages.recentPackagesPage,
      pages.recentSessionsPage,
      selectedType,
    ],
  );

  const onScrollEventHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x: availableCardAnimation.current },
        },
      },
    ],
    { useNativeDriver: true },
  );

  const memoizedAvailableFlatListData = useMemo(
    () =>
      selectedType
        ? [...availablePackages, { spacing: true }]
        : [...availableSessions, { spacing: true }],
    [availablePackages, availableSessions, selectedType],
  );

  const memoizedRecentFlatListData = useMemo(
    () => (selectedType ? recentPackages : recentsSessions),
    [recentPackages, recentsSessions, selectedType],
  );

  const renderAvailableCardsSkeleton = useCallback(
    ({ index }) => {
      return (
        <AvailableItemCardSkeleton
          ref={availableCardAnimation}
          inputRange={[
            (index - 1) * cardSize,
            index * cardSize,
            (index + 1) * cardSize,
          ]}
        />
      );
    },
    [cardSize],
  );

  const renderSkeletonFlatlist = () => (
    <Animated.FlatList
      ref={flatListRef}
      snapToInterval={cardSize}
      bounces={false}
      horizontal
      decelerationRate={0}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={Style.listContainer}
      onScroll={onScrollEventHandler}
      data={new Array(memoizedAvailableFlatListData.length).fill(0)}
      keyExtractor={(item, index) => `${index}`}
      renderItem={renderAvailableCardsSkeleton}
      windowSize={5}
      scrollEnabled={false}
      maxToRenderPerBatch={2}
    />
  );

  const handleBookPressed = useCallback(
    (item) => () => {
      if (!currentUser) {
        navigation.navigate(routes.AUTH, {
          intent: {
            route: routes.REQUEST_SESSION,
            params: {
              offerId: item.id,
              type: item.type,
              startDate: item.startDate,
              endDate: item.endDate,
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
    },
    [currentUser, navigation],
  );

  const renderAvailableCards = useCallback(
    ({ item, index }) => {
      return item.spacing ? (
        <View style={{ width: width / 4 - 10 }} />
      ) : (
        <AvailableItemCard
          ref={availableCardAnimation}
          inputRange={[
            (index - 1) * cardSize,
            index * cardSize,
            (index + 1) * cardSize,
          ]}
          customStyle={Style.availableCardCustomAnimation(opacityAnimation)}
          buttonTitle={i18n.t(translation.book.id)}
          item={item}
          navigation={navigation}
          onPress={handleBookPressed(item)}
        />
      );
    },
    [cardSize, handleBookPressed, navigation, opacityAnimation],
  );

  const renderFlatList = () => {
    return isLoading
      ? renderSkeletonFlatlist()
      : renderAvailableItemsFlatList();
  };

  const onEndAvailableCardReached = useCallback(() => {
    if (selectedType) {
      if (!lastAvailablePackages) {
        setPages({
          ...pages,
          availablePackagesPage: pages.availablePackagesPage + 1,
        });
      }
    } else if (!lastAvailableSessions) {
      setPages({
        ...pages,
        availableSessionsPage: pages.availableSessionsPage + 1,
      });
    }
  }, [lastAvailablePackages, lastAvailableSessions, pages, selectedType]);

  const onEndRecentCardReached = useCallback(() => {
    if (selectedType) {
      if (!lastRecentPackages) {
        setPages({
          ...pages,
          recentPackagesPage: pages.recentPackagesPage + 1,
        });
      }
    } else if (!lastRecentSessions) {
      setPages({
        ...pages,
        recentSessionsPage: pages.recentSessionsPage + 1,
      });
    }
  }, [lastRecentPackages, lastRecentSessions, pages, selectedType]);

  const renderAvailableItemsFlatList = () => (
    <Animated.FlatList
      ref={flatListRef}
      snapToInterval={cardSize}
      bounces={false}
      horizontal
      decelerationRate={0}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={Style.listContainer}
      onScroll={onScrollEventHandler}
      data={memoizedAvailableFlatListData}
      keyExtractor={(item, index) => `${index}`}
      renderItem={renderAvailableCards}
      onEndReached={onEndAvailableCardReached}
      onEndReachedThreshold={0.1}
      scrollEnabled={!isLoading}
      windowSize={5}
      getItemLayout={(data, index) => ({
        length: height * 0.25,
        offset: (height * 0.25 + 20) * index,
        index,
      })}
      maxToRenderPerBatch={2}
    />
  );

  const changeTypeHandler = useCallback(
    (index) => {
      flatListRef?.current?.scrollToIndex({ viewPosition: 0, index: 0 });
      setPages(initialPages);
      setSelectedType(index);
    },
    [initialPages],
  );

  const handleNavigateToFilter = useCallback(() => {
    navigation.navigate(routes.FILTER);
  }, [navigation]);

  const handleChooseSessions = useCallback(() => {
    changeTypeHandler(0);
  }, [changeTypeHandler]);

  const handleChoosePackages = useCallback(() => {
    changeTypeHandler(1);
  }, [changeTypeHandler]);

  const handleLocationChanged = useCallback(
    (location) => {
      setLocation(location);
      setPages(initialPages);
    },
    [initialPages],
  );

  const renderRightSide = () => {
    let list = selectedType ? availablePackages : availableSessions;
    return !isEmpty(list) || isLoading ? (
      renderLists()
    ) : (
      <RenderNoData
        title={i18n.t(translation.noResult.id)}
        description={i18n.t(translation.noResultDescription.id)}
        iconHeight={height / 6}
        iconWidth={width / 2.3}
      />
    );
  };

  const renderLists = () => {
    return (
      <>
        <View style={Style.availableCardsContainer}>{renderFlatList()}</View>
        <View style={Style.listRecent}>
          <View style={Style.recentlyTextContainer}>
            <Text style={Style.recentlyText}>
              <I18n {...translation.recently} />
            </Text>
          </View>
          <View style={Style.flatListContainer}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={memoizedRecentFlatListData}
              keyExtractor={(_, index) => `${index}`}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={9}
              renderItem={({ item }) => (
                <View style={Style.recentCard}>
                  <CardRecently
                    image={item.image}
                    name={item.title}
                    buttonTitle={i18n.t(translation.book.id)}
                    location={item.location}
                    navigation={navigation}
                    item={item}
                    onPressBook={handleBookPressed(item)}
                  />
                </View>
              )}
              onEndReached={onEndRecentCardReached}
              onEndReachedThreshold={0.1}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={Style.container}>
      <MapView
        ref={_map}
        initialRegion={initialRegion}
        maxZoomLevel={2}
        style={Style.config}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapsStyle}
      />
      <View style={Style.container}>
        <View style={Style.topLayer}>
          <View style={Style.header}>
            <Header onPress={navigation.openDrawer} />
          </View>
          <View style={Style.searchContainer}>
            <SearchBar
              placeholder={i18n.t(translation.location.id)}
              width={width * 0.74}
              onChangeText={handleLocationChanged}
              value={location}
              onSearchPress={onSearchByLocationActive}
            />
            <TouchableOpacity
              style={Style.filterContainer}
              onPress={handleNavigateToFilter}
            >
              <FilterIcon width={height * 0.065} height={height * 0.065} />
            </TouchableOpacity>
          </View>
          <View>
            <MenuBar
              selectedType={selectedType}
              onChangeType={changeTypeHandler}
            />
          </View>
        </View>
        <View style={Style.bottomLayer}>
          <View style={Style.leftSide}>
            <Animated.View
              style={Style.typeTitleComponent(
                isSelected(0),
                notSelectedOpacity,
              )}
            >
              <TouchableOpacity
                style={Style.leftSideTextContainer}
                onPress={handleChooseSessions}
              >
                <Animated.View style={Style.selectionDot(opacityHidden)} />
                <Animated.Text style={Style.typeTitle}>
                  <I18n {...translation.typeAvailableSessions} />
                </Animated.Text>
                <Animated.View style={Style.outLine(opacityHidden)} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={Style.typeTitleComponent(isSelected(1), selectedOpacity)}
            >
              <TouchableOpacity onPress={handleChoosePackages}>
                <Animated.View style={Style.selectionDot(opacityVisible)} />
                <Animated.Text style={[Style.typeTitle]}>
                  <I18n {...translation.typePackages} />
                </Animated.Text>
                <Animated.View style={Style.outLine(opacityVisible)} />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View style={Style.rightSide}>{renderRightSide()}</View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  recentsSessions: getRecentsSessionsSelector(),
  availableSessions: getAvailableSessionsSelector(),
  availablePackages: getAvailablePackagesSelector(),
  recentPackages: getRecentPackagesSelector(),
  isLoading: getIsLoadingDiscoverSelector(),
  currentUser: getCurrentUser(),
  lastAvailableSessions: isLastAvailableSessionsPage(),
  lastRecentSessions: isLastRecentSessionsPage(),
  lastAvailablePackages: isLastAvailablePackagesPage(),
  lastRecentPackages: isLastRecentPackagesPage(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAvailableSessions,
      getRecentPackages,
      getAvailablePackages,
      getRecentSessions,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Discover);
