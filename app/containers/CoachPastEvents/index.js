import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Style } from './style';
import OfferCard from '../../components/OfferCard';
import I18n from '../../components/I18n';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { translation } from './messages';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { getPastRequestList } from './store/actions.creator';
import pastRequestReducerConfig from './store/reducer';
import pastRequestSagaConfig from './store/saga';
import {
  getIsLastPageSelector,
  getPastRequestLoaderSelector,
  getPastRequestSelector,
} from './store/selectors';
import { colors } from '../../utils/colors';
import { routes } from '../../utils/navigation/routes';
import { ERROR_MODAL, PAST } from '../../config/app.constant';
import FullScreenLoader from '../../components/FullScreenLoader';
import RenderNoData from '../../components/RenderNoData';
import i18n from '../../config/i18n';
import { openModal } from '../Modal/store/actions.creator';
const { height } = Dimensions.get('screen');

export const CoachPastEvents = ({
  navigation,
  pastRequests,
  isLoading,
  isLastPage,
  getPastRequestList,
  openModal,
}) => {
  useInjectReducer(pastRequestReducerConfig);
  useInjectSaga(pastRequestSagaConfig);
  const [page, setPage] = useState(0);

  const getReceivedRequestCallback = useCallback(
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

  const onEndReachedHandler = useCallback(() => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  }, [isLastPage, page]);

  useEffect(() => {
    getPastRequestList({ page }, getReceivedRequestCallback);
  }, [page, getPastRequestList, getReceivedRequestCallback]);

  const handleSeeOfferDetails = (id) => () => {
    navigation.navigate(routes.REQUEST_CONFIRMATION, {
      requestId: id,
      source: PAST,
    });
  };

  const onPressReviewHandler = (id) => () => {
    navigation.navigate(routes.SURFER_PROFILE, {
      surferId: id,
    });
  };

  const renderOfferCard = ({ item }) => {
    return (
      <OfferCard
        surfer={item.surfer}
        item={item}
        showSender
        onPress={handleSeeOfferDetails(item.id)}
        showMenuOption={false}
        showReview={true}
        onPressReview={onPressReviewHandler(item.surfer.id)}
      />
    );
  };

  return (
    <View style={Style.container} showsVerticalScrollIndicator={false}>
      <GoBackHeader />
      <Text style={Style.receivingRequestsText}>
        <I18n {...translation.pastRequests} />
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pastRequests}
        keyExtractor={(_, index) => `${index}`}
        renderItem={renderOfferCard}
        onEndReached={onEndReachedHandler}
        initialNumToRender={5}
        maxToRenderPerBatch={11}
        windowSize={11}
        getItemLayout={(_, index) => ({
          length: height / 5,
          offset: (height / 5 + 15) * index,
          index,
        })}
        ListEmptyComponent={
          <RenderNoData title={i18n.t(translation.noRequests.id)} />
        }
        refreshing={isLoading}
      />
      {isLoading && (
        <ActivityIndicator
          color={colors.PRIMARY}
          size={'large'}
          style={Style.activityIndicator}
        />
      )}
      <FullScreenLoader visible={isLoading && page === 0} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: getPastRequestLoaderSelector(),
  isLastPage: getIsLastPageSelector(),
  pastRequests: getPastRequestSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPastRequestList,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CoachPastEvents);
