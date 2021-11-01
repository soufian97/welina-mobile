import React, { memo, useCallback, useEffect } from 'react';
import ReactModal from 'react-native-modal';
import { View } from 'react-native';
import { Style } from './style';
import { useInjectReducer } from '../../utils/store/injectReducer';
import modalReducer from './store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getStructuredState } from './store/selectors';
import { closeModal } from './store/actions.creator';
import modalsList from './modalsList';
import { colors } from '../../utils/colors';
import Toast from 'react-native-toast-message';
import { closeToast } from '../Splash/store/actions.creator';
import { getToastPropertiesSelector } from '../Splash/store/selectors';

const Modal = () => {
  useInjectReducer(modalReducer);

  const { isModalOpen, modalKey, params } = useSelector(getStructuredState);

  const CurrentModalComponent = modalsList[modalKey];
  const dispatch = useDispatch();
  const closeModalHandler = useCallback(() => dispatch(closeModal()), [
    dispatch,
  ]);

  const toast = useSelector(getToastPropertiesSelector());

  useEffect(() => {
    if (toast.visibility) {
      Toast.show({
        type: toast.type,
        position: 'top',
        text1: toast.title,
        text2: toast.body,
        autoHide: true,
        topOffset: 50,
        visibilityTime: 2000,
        onHide: () => dispatch(closeToast()),
      });
    }
  }, [dispatch, toast]);

  return (
    <View>
      <ReactModal
        animationIn="zoomIn"
        animationOut="zoomOut"
        hideModalContentWhileAnimating={true}
        isVisible={isModalOpen}
        backdropOpacity={0.8}
        backdropColor={colors.BLUE_MODAL_BACKGROUND}
        style={[Style.modalStyle, CurrentModalComponent.style]}
        useNativeDriver={true}
        onBackButtonPress={closeModalHandler}
        onBackdropPress={closeModalHandler}
      >
        <View style={Style.modalContainer}>
          <CurrentModalComponent.Component {...params} />
        </View>
      </ReactModal>
    </View>
  );
};

export default memo(Modal);
