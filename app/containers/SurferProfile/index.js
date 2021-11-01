import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import CoachProfile from '../../components/ProfileDetails';
import Reviews from '../../components/Reviews';
import { Style } from './style';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { routes } from '../../utils/navigation/routes';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import {
  getSurferInfoSelector,
  getReviewsSelector,
  getIsLastReviewsPage,
  getLoadingSelector,
} from './store/selectors';
import { getSurferInfo, getReviews } from './store/actions.creator';
import surferProfileReducerConfig from './store/reducer';
import surferProfileSagaConfig from './store/saga';
import { getCurrentUser } from '../Auth/store/selectors';
import { isEmpty } from 'lodash';
import { colors } from '../../utils/colors';
import { openModal } from '../Modal/store/actions.creator';
import { ERROR_MODAL } from '../../config/app.constant';

const SurferProfile = ({
  surferInfo,
  currentUser,
  reviews,
  isLastReviewsPage,
  navigation,
  getSurferInfo,
  getReviews,
  route,
  isLoading,
  openModal,
}) => {
  useInjectReducer(surferProfileReducerConfig);
  useInjectSaga(surferProfileSagaConfig);
  const surferId = route.params?.surferId || currentUser?.id;
  const [reviewsPage, setReviewsPage] = useState(0);
  const { firstName, lastName, id, averageScore, photo, type } = isEmpty(
    surferInfo,
  )
    ? currentUser
    : surferInfo;
  const getMoreReviews = useCallback(
    () => !isLastReviewsPage && setReviewsPage(reviewsPage + 1),
    [isLastReviewsPage, reviewsPage],
  );

  const surferProfileCallback = useCallback(
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
    getReviews({ id: surferId, page: reviewsPage }, surferProfileCallback);
  }, [getReviews, reviewsPage, surferId, surferProfileCallback]);

  useEffect(() => {
    if (route.params?.surferId) {
      getSurferInfo(surferId, surferProfileCallback);
    }
  }, [getSurferInfo, route.params, surferId, surferProfileCallback]);

  const onPressWriteReviewHandler = useCallback(() => {
    const routeParam = {
      user: {
        userId: id,
        firstName,
        lastName,
        scoreAverage: averageScore,
      },
    };
    navigation.replace(routes.WRITE_REVIEW, { ...routeParam });
  }, [averageScore, firstName, id, lastName, navigation]);

  const profile = {
    photo,
    firstName,
    lastName,
    type,
  };

  const getCanReviewState = () =>
    isEmpty(surferInfo) ? false : surferInfo?.canReview;
  return (
    <View style={Style.screen}>
      <View>
        <GoBackHeader />
        {!isLoading ? (
          <>
            <View style={Style.topContainer}>
              <CoachProfile profile={profile} scoreAverage={averageScore} />
            </View>
            <View style={Style.bottomContainer}>
              <Reviews
                review={reviews}
                onPressWriteReview={onPressWriteReviewHandler}
                getMoreReviews={getMoreReviews}
                scoreAverage={averageScore}
                reviewerType={profile?.type?.toLowerCase()}
                canWriteReview={getCanReviewState()}
              />
            </View>
          </>
        ) : (
          <ActivityIndicator
            size={'large'}
            color={colors.PRIMARY}
            style={Style.activityIndicator}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  surferInfo: getSurferInfoSelector(),
  currentUser: getCurrentUser(),
  reviews: getReviewsSelector(),
  isLastReviewsPage: getIsLastReviewsPage(),
  isLoading: getLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSurferInfo,
      getReviews,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SurferProfile);
