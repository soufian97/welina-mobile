import React, { useEffect, useCallback } from 'react';
import { View, Modal } from 'react-native';
import { Style } from './style';
import FirstStep from './Components/FirstStep';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { bookOffer } from './store/actions.creator';
import {
  openSuccessModalAction,
  closeSuccessModalAction,
} from '../Splash/store/actions.creator';

import {
  getSuccessModalVisibilitySelector,
  getMessageSelector,
} from '../Splash/store/selectors';
import { getCurrentUser } from '../Auth/store/selectors';
import RequestSessionReducerConfig from './store/reducer';
import RequestSessionSagaConfig from './store/saga';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import GoBackHeader from '../../components/Headers/GobackHeader';
import i18n from '../../config/i18n';
import { translation } from './messages';
import PopupIcon from '../../components/PopupModals/PopupIcon';
import { SuccessCheckIcon } from '../../assets/svgs';
import { colors } from '../../utils/colors';
import ProgressLoader from 'rn-progress-loader';
import { getRequestSessionLoaderSelector } from './store/selectors';
import { routes } from '../../utils/navigation/routes';
import { COACH, ERROR_MODAL } from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';

const initialRegion = {
  latitude: 33.597739,
  longitude: -7.635933,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
};

const RequestSession = ({
  openSuccessModalAction,
  closeSuccessModalAction,
  successModalVisibility,
  navigation,
  route,
  bookOffer,
  isLoading,
  message,
  currentUser,
  openModal,
}) => {
  useInjectReducer(RequestSessionReducerConfig);
  useInjectSaga(RequestSessionSagaConfig);
  const _map = React.useRef(null);
  const {
    offerId,
    type,
    startDate,
    endDate,
    capacity,
    withKids,
  } = route?.params;

  useEffect(() => {
    if (currentUser?.type === COACH) {
      navigation.replace(routes.COACH_DASHBOARD);
    }
  }, [currentUser, navigation]);

  const bookOfferCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        openSuccessModalAction(i18n.t(translation.reservationSuccess.id));
      }
    },
    [openModal, openSuccessModalAction],
  );

  const closeSuccessModal = useCallback(() => {
    closeSuccessModalAction();
    navigation.navigate(routes.DISCOVER);
  }, [navigation, closeSuccessModalAction]);

  const handleBookOffer = useCallback(
    (params) => {
      bookOffer({ offerId: offerId, ...params }, bookOfferCallback);
    },
    [bookOffer, bookOfferCallback, offerId],
  );

  useEffect(() => {
    _map.current &&
      _map.current.animateToRegion(
        {
          ...initialRegion,
        },
        800,
      );
  });

  const handleNoAttendeeWasSelected = useCallback(() => {
    openModal(ERROR_MODAL, {
      error: 0,
      withBackground: false,
    });
  }, [openModal]);

  return (
    <View style={Style.screen}>
      <MapView
        ref={_map}
        style={Style.maps}
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={2}
        customMapStyle={mapsStyle}
      />
      <View style={Style.topLayer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalVisibility}
        >
          <PopupIcon
            confirmPressed={closeSuccessModal}
            message={message}
            buttonTitle={i18n.t(translation.okay.id)}
            icon={<SuccessCheckIcon />}
          />
        </Modal>
        <ProgressLoader
          visible={isLoading}
          isModal={true}
          isHUD={true}
          hudColor={colors.SECONDARY}
          color={colors.PRIMARY}
        />
        <GoBackHeader />
        <FirstStep
          availability={{ startDate, endDate }}
          type={type}
          navigation={navigation}
          bookOffer={handleBookOffer}
          shouldSelectAtLeastOneAttendee={handleNoAttendeeWasSelected}
          capacity={capacity}
          withKids={withKids}
        />
      </View>
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  successModalVisibility: getSuccessModalVisibilitySelector(),
  isLoading: getRequestSessionLoaderSelector(),
  message: getMessageSelector(),
  currentUser: getCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSuccessModalAction,
      closeSuccessModalAction,
      bookOffer,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RequestSession);
