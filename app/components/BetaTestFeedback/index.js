import React, { useCallback, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import I18n from '../I18n';
import { Style } from './style';
import { translation } from './messages';
import i18n from '../../config/i18n';
import Button from '../Buttons/Button';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import Popup from '../PopupModals/Popup';
import { useForm } from '../../utils/hooks';
import { stringNotBlank } from '../../utils/validators';
import { BETA_TEST_GENERAL_MODAL, BUG_TYPE } from '../../config/app.constant';
import {
  openModalAction,
  closeModalAction,
  addBetaReviewAction,
  closeBetaTestModalAction,
} from '../../containers/Splash/store/actions.creator';
import { openModal } from '../../containers/Modal/store/actions.creator';
import {
  getModalVisibilitySelector,
  getErrorSelector,
  getHomeLoaderSelector,
} from '../../containers/Splash/store/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import FullScreenLoader from '../FullScreenLoader';
import { routes } from '../../utils/navigation/routes';
import PopupIcon from '../PopupModals/PopupIcon';
import { ShakaIcon } from '../../assets/svgs';

const { width, height } = Dimensions.get('window');
const size = { radius: 25, height: 45, width: width * 0.37 };

const rewards = [
  {
    value: BUG_TYPE.LIKE,
    label: i18n.t(translation.rewardsTitle1.id),
  },
  {
    value: BUG_TYPE.DONT_LIKE,
    label: i18n.t(translation.rewardsTitle2.id),
  },
  {
    value: BUG_TYPE.SUGGESTION,
    label: i18n.t(translation.rewardsTitle3.id),
  },
  {
    value: BUG_TYPE.BUG,
    label: i18n.t(translation.rewardsTitle4.id),
  },
];

const BetaTestFeedback = ({
  addBetaReviewLoading,
  modalVisibility,
  error,
  addBetaReviewAction,
  closeModalAction,
  openModalAction,
  closeBetaTestModalAction,
  navigation,
  openModal,
}) => {
  const bugMessage = useForm('bugMessage', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'bug message' }),
    ),
  ]);
  const bugType = useForm('bugType', null, [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'bug type' }),
    ),
  ]);

  const [successModalVisibility, setSuccessModalVisibility] = useState(false);
  const [formState, changeFormState] = useState({
    dirty: false,
    isSucceeded: false,
    isSubmitting: false,
    rootCause: null,
  });

  const onChangeHandler = useCallback(
    (notify) => (value) => {
      notify(value);
    },
    [],
  );

  const inputErrors = (value) => {
    const hasErrors = formState.dirty && value.hasErrors;
    if (hasErrors) {
      return <Text style={Style.textError}>{value.errors[0]}</Text>;
    }
    return null;
  };

  const addBetaTestCallback = useCallback(
    (err) => {
      if (err) {
        openModalAction(err?.response?.code);
      } else {
        setSuccessModalVisibility(true);
      }
    },
    [openModalAction],
  );

  const onSendBetaTestFeedback = useCallback(
    (payload) => {
      let screenName =
        navigation.dangerouslyGetState().routes[0]?.state?.routes[
          navigation.dangerouslyGetState().routes[0]?.state?.routes.length - 1
        ].name || routes.SPLASH;
      const device = Platform.OS.toUpperCase();
      const appVersion = Platform.Version;
      const resolution = `${width}x${height}`;
      addBetaReviewAction(
        { ...payload, screenName, device, appVersion, resolution },
        addBetaTestCallback,
      );
    },
    [navigation, addBetaReviewAction, addBetaTestCallback],
  );

  const onPressDismiss = useCallback(() => {
    closeBetaTestModalAction();
  }, [closeBetaTestModalAction]);

  const onSendFeedback = useCallback(() => {
    changeFormState({ ...formState, dirty: true });
    if (!bugType.hasErrors && !bugMessage.hasErrors) {
      onSendBetaTestFeedback({
        bugType: bugType.value,
        bugMessage: bugMessage.value,
      });
    }
  }, [bugMessage, bugType, formState, onSendBetaTestFeedback]);

  const onPressGoToGeneralTest = useCallback(() => {
    openModal(BETA_TEST_GENERAL_MODAL);
    closeBetaTestModalAction();
  }, [closeBetaTestModalAction, openModal]);

  const onPressSuccessModalConfirm = useCallback(() => {
    setSuccessModalVisibility(false);
    onPressDismiss();
  }, [onPressDismiss]);
  return (
    <View style={Style.wrapper}>
      <Modal animationType="fade" transparent={true} visible={modalVisibility}>
        <Popup confirmPressed={closeModalAction} error={error} />
      </Modal>
      <Modal visible={successModalVisibility} transparent={true}>
        <PopupIcon
          buttonTitle={'Okay !'}
          confirmPressed={onPressSuccessModalConfirm}
          message={'Thank you for your feedback !'}
          icon={<ShakaIcon width={140} height={140} />}
        />
      </Modal>
      <View style={Style.container}>
        <TouchableOpacity style={Style.dismissButton} onPress={onPressDismiss}>
          <Text style={Style.textDismissIcon}>X</Text>
        </TouchableOpacity>
        <Text style={Style.textExplain}>
          <I18n {...translation.selectFeedBack} />
        </Text>
        <View style={Style.dropdownContainer}>
          <Dropdown
            data={rewards}
            underlineColor={'transparent'}
            mainContainerStyle={Style.mainDropdownContainerStyle}
            borderRadius={15}
            value={bugType.value}
            onChange={onChangeHandler(bugType.changeModel)}
            disableSort={true}
          />
        </View>
        {inputErrors(bugType)}
        <Text style={Style.textExplain}>
          <I18n {...translation.explain} />
        </Text>
        <View style={Style.textInputContainer}>
          <TextInput
            style={Style.textInput}
            multiline={true}
            numberOfLines={10}
            value={bugMessage.value}
            onChangeText={onChangeHandler(bugMessage.changeModel)}
          />
        </View>
        {inputErrors(bugMessage)}
        <View style={Style.buttonContainer}>
          <Button
            title={i18n.t(translation.send.id)}
            size={size}
            onPress={onSendFeedback}
          />
        </View>
        <TouchableOpacity onPress={onPressGoToGeneralTest}>
          <Text style={Style.textClickToEnd}>
            <I18n {...translation.clickToEnd} />
          </Text>
        </TouchableOpacity>
      </View>
      <FullScreenLoader visible={addBetaReviewLoading} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  error: getErrorSelector(),
  modalVisibility: getModalVisibilitySelector(),
  addBetaReviewLoading: getHomeLoaderSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModalAction,
      closeModalAction,
      addBetaReviewAction,
      closeBetaTestModalAction,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BetaTestFeedback);
