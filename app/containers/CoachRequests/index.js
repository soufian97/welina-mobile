import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Style } from './style';
import OfferCard from '../../components/OfferCard';
import I18n from '../../components/I18n';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { translation } from './messages';
import { routes } from '../../utils/navigation/routes';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { getReceivedRequestList } from './store/actions.creator';
import receivedRequestReducerConfig from './store/reducer';
import receivedRequestSagaConfig from './store/saga';
import {
  getIsLastPageSelector,
  getReceivedRequestLoaderSelector,
  getReceivedRequestSelector,
} from './store/selectors';
import FullScreenLoader from '../../components/FullScreenLoader';
import RenderNoData from '../../components/RenderNoData';
const { height } = Dimensions.get('screen');
import i18n from '../../config/i18n';
import { openModal } from '../Modal/store/actions.creator';
import { ERROR_MODAL } from '../../config/app.constant';

export const CoachRequests = ({
  navigation,
  requests,
  isLoading,
  isLastPage,
  getReceivedRequestList,
  openModal,
}) => {
  useInjectReducer(receivedRequestReducerConfig);
  useInjectSaga(receivedRequestSagaConfig);
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
    getReceivedRequestList({ page }, getReceivedRequestCallback);
  }, [page, getReceivedRequestCallback, getReceivedRequestList]);

  const handleSeeOfferDetails = (id) => () => {
    navigation.replace(routes.REQUEST_CONFIRMATION, { requestId: id });
  };

  const handleGoBack = useCallback(() => {
    navigation.navigate(routes.COACH_DASHBOARD);
  }, [navigation]);

  const renderOfferCard = ({ item }) => {
    return (
      <OfferCard
        surfer={item.surfer}
        item={item}
        showSender
        onPress={handleSeeOfferDetails(item.id)}
        showMenuOption={false}
      />
    );
  };

  return (
    <View style={Style.container} showsVerticalScrollIndicator={false}>
      <GoBackHeader leftButtonAction={handleGoBack} />
      <Text style={Style.receivingRequestsText}>
        <I18n {...translation.requests} />
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={requests}
        keyExtractor={(_, index) => `${index}`}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        renderItem={renderOfferCard}
        onEndReached={onEndReachedHandler}
        getItemLayout={(_, index) => ({
          length: height / 5,
          offset: (height / 5 + 15) * index,
          index,
        })}
        refreshing={isLoading}
        ListEmptyComponent={
          <RenderNoData title={i18n.t(translation.noRequests.id)} />
        }
      />
      <FullScreenLoader visible={isLoading} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  requests: getReceivedRequestSelector(),
  isLoading: getReceivedRequestLoaderSelector(),
  isLastPage: getIsLastPageSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getReceivedRequestList,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CoachRequests);
