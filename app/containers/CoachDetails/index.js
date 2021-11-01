import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CoachDescription from './components/CoachDescription';
import { Style } from './style';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import {
  getDescriptionSelector,
  getReviewsSelector,
  getIsLastReviewsPage,
  getCoachDetailsLoaderSelector,
  getOffersSelector,
  getIsLastOffersPage,
} from './store/selectors';
import { getOffers, getDescription, getReviews } from './store/actions.creator';
import coachDetailsReducerConfig from './store/reducer';
import coachDetailsSagaConfig from './store/saga';
import CoachProfile from '../../components/ProfileDetails';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import Reviews from '../../components/Reviews';
import OfferCard from '../../components/OfferCard';
import { routes } from '../../utils/navigation/routes';
import { getCurrentUser } from '../Auth/store/selectors';
import { colors } from '../../utils/colors';
import { isEmpty } from 'lodash';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { ERROR_MODAL } from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';
const { width } = Dimensions.get('window');
const CoachDetails = ({
  description,
  getDescription,
  getReviews,
  reviews,
  currentUser,
  route,
  navigation,
  isLastReviewsPage,
  getOffers,
  offers,
  isLastOffersPage,
  isLoading,
  openModal,
}) => {
  useInjectReducer(coachDetailsReducerConfig);
  useInjectSaga(coachDetailsSagaConfig);
  const [reviewsPage, setReviewsPage] = useState(0);
  const [offersPage, setOffersPage] = useState(0);

  const { coachId, item } = route.params;
  const { averageScore: scoreAverage } = description;
  const detailsCallback = useCallback(
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
    getDescription({ coachId }, detailsCallback);
  }, [detailsCallback, getDescription, coachId, selectedTab]);

  useEffect(() => {
    getReviews({ id: coachId, page: reviewsPage }, detailsCallback);
  }, [coachId, detailsCallback, getReviews, reviewsPage, selectedTab]);

  const onPressWriteReviewHandler = useCallback(() => {
    const { firstName, lastName } = description;
    const routeParam = {
      user: { userId: coachId, firstName, lastName, scoreAverage },
      item,
    };
    if (currentUser) {
      navigation.navigate(routes.WRITE_REVIEW, { ...routeParam });
    } else {
      navigation.navigate(routes.AUTH, {
        intent: { route: routes.WRITE_REVIEW, params: routeParam },
      });
    }
  }, [coachId, currentUser, description, item, navigation, scoreAverage]);

  const getMoreReviews = useCallback(
    () => !isLastReviewsPage && setReviewsPage(reviewsPage + 1),
    [isLastReviewsPage, reviewsPage],
  );

  useEffect(() => {
    getOffers({ id: coachId, page: offersPage }, detailsCallback);
  }, [coachId, detailsCallback, getOffers, offersPage, selectedTab]);

  const getMoreOffers = useCallback(
    () => !isLastOffersPage && setOffersPage(offersPage + 1),
    [isLastOffersPage, offersPage],
  );

  const handleSeeOfferDetails = useCallback(
    (item) => () => {
      navigation.navigate(routes.DETAILS, { item });
    },
    [navigation],
  );

  const renderOffers = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => `${index}`}
      data={offers}
      onEndReached={getMoreOffers}
      onEndReachedThreshold={0.1}
      renderItem={({ item }) => (
        <OfferCard
          showMenuOption={false}
          item={{ offer: { ...item }, ...item }}
          onPress={handleSeeOfferDetails(item)}
        />
      )}
    />
  );

  const data = [
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={Style.bottomContainer}
    >
      <CoachDescription description={description} />
    </ScrollView>,
    <View style={Style.bottomContainer}>{renderOffers()}</View>,
    <View style={Style.bottomContainer}>
      <Reviews
        review={reviews}
        onPressWriteReview={onPressWriteReviewHandler}
        scoreAverage={scoreAverage}
        getMoreReviews={getMoreReviews}
        canWriteReview={description?.canReview}
      />
    </View>,
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedTab,
    });
  }, [selectedTab]);

  useEffect(() => {
    if (route.params?.reviewTab) {
      setSelectedTab(route.params?.reviewTab);
      flatListRef.current?.scrollToIndex({
        index: route.params?.reviewTab,
      });
    }
  }, [route.params]);

  return (
    <View style={Style.container}>
      <GoBackHeader />
      <MapView
        style={Style.mapsStyle}
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={2}
        customMapStyle={mapsStyle}
      />
      <View style={Style.topLayer}>
        {isLoading || isEmpty(description) ? (
          <ActivityIndicator
            style={Style.loader}
            color={colors.PRIMARY}
            size={'large'}
          />
        ) : (
          <>
            <CoachProfile
              profile={description}
              onPress={setSelectedTab}
              selected={selectedTab}
              scoreAverage={scoreAverage}
            />
            <FlatList
              ref={flatListRef}
              horizontal
              data={data}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => item}
              showsHorizontalScrollIndicator={false}
              snapToInterval={width * 0.9}
              scrollEnabled={false}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={10}
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
            />
          </>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  description: getDescriptionSelector(),
  reviews: getReviewsSelector(),
  isLastReviewsPage: getIsLastReviewsPage(),
  currentUser: getCurrentUser(),
  isLoading: getCoachDetailsLoaderSelector(),
  offers: getOffersSelector(),
  isLastOffersPage: getIsLastOffersPage(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDescription,
      getReviews,
      getOffers,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CoachDetails);
