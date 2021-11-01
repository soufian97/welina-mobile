import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Style } from './style';

import { HandIcon, Combined, NoDataIcon } from '../../assets/svgs';
import OfferCard from '../../components/OfferCard';
import i18n from '../../config/i18n';
import I18n from '../../components/I18n';
import { routes } from '../../utils/navigation/routes';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../Auth/store/selectors';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import coachRequestsReducerConfig from '../CoachRequests/store/reducer';
import coachRequestsSagaConfig from '../CoachRequests/store/saga';
import { getReceivedRequestPreviewSelector } from '../CoachRequests/store/selectors';
import { getReceivedRequestList } from '../CoachRequests/store/actions.creator';
import { translation } from './messages';
import {
  REVIEWS_SMALL,
  REQUESTS_SMALL,
  ERROR_MODAL,
} from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';

const { height } = Dimensions.get('screen');

const CoachDashboard = ({
  navigation,
  currentUser,
  getReceivedRequestList,
  requestsPreview,
  openModal,
}) => {
  useInjectReducer(coachRequestsReducerConfig);
  useInjectSaga(coachRequestsSagaConfig);
  const data = [
    {
      title: i18n.t(translation.requests.id),
      number: requestsPreview?.totalElements,
      request: requestsPreview?.lastRequest,
    },
    {
      title: i18n.t(translation.reviews.id),
      number: 0,
    },
  ];

  const handleSeeAllPressed = useCallback(
    (item) => () => {
      switch (item.title) {
        case REQUESTS_SMALL:
          return navigation.navigate(routes.COACH_REQUESTS);
        case REVIEWS_SMALL:
          return navigation.navigate(routes.COACH_PROFILE, { selectedTab: 2 });
      }
    },
    [navigation],
  );

  const handleSeeOfferDetails = useCallback(() => {
    navigation.navigate(routes.REQUEST_CONFIRMATION, {
      requestId: requestsPreview?.lastRequest?.id,
    });
  }, [navigation, requestsPreview]);

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

  useEffect(() => {
    getReceivedRequestList({ page: 0 }, getReceivedRequestCallback);
  }, [getReceivedRequestCallback, getReceivedRequestList]);

  return (
    <View style={Style.container}>
      <ScrollView
        style={Style.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={Style.header}>
          <View>
            <View style={Style.welcomeContainer}>
              <Text style={Style.headerWelcome}>
                <I18n {...translation.welcome} />
              </Text>
              <HandIcon />
            </View>
            <Text
              style={Style.coachFullName}
            >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
          </View>
          <TouchableOpacity onPress={navigation.openDrawer}>
            <Combined />
          </TouchableOpacity>
        </View>
        {data.map((item) => {
          return (
            <View key={item.title}>
              <View style={Style.offerTitleContainer}>
                <View style={Style.offerTitle}>
                  <Text style={Style.offerTitleText}>{item.title}</Text>
                  <Text style={Style.offerTitleNumber}>({item.number})</Text>
                </View>
                <TouchableOpacity onPress={handleSeeAllPressed(item)}>
                  <Text style={Style.seeAllText}>
                    <I18n {...translation.seeAll} />
                  </Text>
                </TouchableOpacity>
              </View>
              {item.request ? (
                <OfferCard
                  item={item?.request}
                  surfer={item?.request?.surfer}
                  showSender
                  onPress={handleSeeOfferDetails}
                  showMenuOption={false}
                />
              ) : (
                <View style={Style.noDataContainer}>
                  <View style={Style.noDataIconContainer}>
                    <NoDataIcon width={height / 6} height={height / 6} />
                  </View>
                  <View style={Style.noDataText}>
                    <Text style={Style.noDataTitle}>
                      {i18n.t(translation.noDataTitle.id, { type: item.title })}
                    </Text>
                    <Text style={Style.noDataBody}>
                      {i18n.t(translation.noDataBody.id)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  requestsPreview: getReceivedRequestPreviewSelector(),
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

export default compose(withConnect)(CoachDashboard);
