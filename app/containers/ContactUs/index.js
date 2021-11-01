import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import { Style } from './style';
import GoBackHeader from '../../components/Headers/GobackHeader';
import Button from '../../components/Buttons/Button';
import I18n from '../../components/I18n';
import i18n from '../../config/i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translation } from './messages';
import { colors } from '../../utils/colors';
import { Phone, Email, SuccessCheckIcon } from '../../assets/svgs';
import {
  ERROR_MODAL,
  WELINA_EMAIL,
  WELINA_PHONE,
} from '../../config/app.constant';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { postEmail } from './store/actions.creator';
import contactUsReducerConfig from './store/reducer';
import contactUsSagaConfig from './store/saga';
import { getContactUsLoaderSelector } from './store/selectors';
import { getCurrentUser } from '../Auth/store/selectors';
import {
  getSuccessModalVisibilitySelector,
  getMessageSelector,
} from '../Splash/store/selectors';
import {
  openSuccessModalAction,
  closeSuccessModalAction,
} from '../Splash/store/actions.creator';
import { useForm } from '../../utils/hooks';
import { emailValidator, stringNotBlank } from '../../utils/validators';
import { isEmpty } from 'lodash';
import ProgressLoader from 'rn-progress-loader';
import PopupIcon from '../../components/PopupModals/PopupIcon';
import { openModal } from '../Modal/store/actions.creator';

const size = {
  radius: 10,
  height: 45,
  width: Dimensions.get('window').width * 0.35,
};

const ContactUs = ({
  postEmail,
  isLoading,
  successModalVisibility,
  closeSuccessModalAction,
  openSuccessModalAction,
  currentUser,
  successMessage,
  openModal,
}) => {
  useInjectReducer(contactUsReducerConfig);
  useInjectSaga(contactUsSagaConfig);
  const openPhoneComposer = () => Linking.openURL(`tel:${WELINA_PHONE}`);

  const fullName = useForm(
    'fullName',
    isEmpty(currentUser)
      ? ''
      : `${currentUser.firstName} ${currentUser.lastName}`,
    [
      stringNotBlank(
        i18n.t(translation.stringBlankError.id, { name: 'full name' }),
      ),
    ],
  );
  const email = useForm(
    'email',
    isEmpty(currentUser) ? '' : `${currentUser.email}`,
    [
      stringNotBlank(
        i18n.t(translation.stringBlankError.id, { name: 'email' }),
      ),
      emailValidator(
        i18n.t(translation.stringBlankError.id, { name: 'email' }),
      ),
    ],
  );
  const message = useForm('message', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'message' }),
    ),
  ]);

  const [formState, changeFormState] = useState({
    dirty: false,
    isSucceeded: false,
    isSubmitting: false,
    rootCause: null,
  });

  const onConfirmSuccessModalPress = useCallback(() => {
    message.changeModel('');
    changeFormState({ ...formState, dirty: false });
    closeSuccessModalAction();
  }, [closeSuccessModalAction, formState, message]);

  const postEmailCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        openSuccessModalAction(i18n.t(translation.emaillSuccess.id));
      }
    },
    [openModal, openSuccessModalAction],
  );

  const onPressSendMessageHandler = useCallback(() => {
    changeFormState({ ...formState, dirty: true });
    if (!fullName.hasErrors && !email.hasErrors && !message.hasErrors) {
      postEmail(
        {
          fullName: fullName.value,
          email: email.value,
          message: message.value,
        },
        postEmailCallback,
      );
    }
  }, [
    email.hasErrors,
    email.value,
    formState,
    fullName.hasErrors,
    fullName.value,
    message.hasErrors,
    message.value,
    postEmail,
    postEmailCallback,
  ]);

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
  return (
    <ScrollView style={Style.screen} showsVerticalScrollIndicator={false}>
      <GoBackHeader />
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisibility}
      >
        <PopupIcon
          confirmPressed={onConfirmSuccessModalPress}
          message={successMessage}
          buttonTitle={i18n.t(translation.okay.id)}
          icon={<SuccessCheckIcon />}
        />
      </Modal>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={Style.scrollContainer}
      >
        <Text style={Style.textScreenTitle}>
          <I18n {...translation.contactUs} />
        </Text>
        <Text style={Style.textScreenParagraph}>
          <I18n {...translation.ifYouNeedOurHelp} />
        </Text>
        {isEmpty(currentUser) && (
          <View>
            <Text style={Style.textLabel}>
              <I18n {...translation.yourName} />
            </Text>
            <View style={Style.inputTextWrapper}>
              <TextInput
                value={fullName.value}
                onChangeText={onChangeHandler(fullName.changeModel)}
                style={Style.inputTextMonoLine}
                placeholder={i18n.t(translation.typeYourName.id)}
                placeholderTextColor={colors.GRAY}
              />
            </View>
            {inputErrors(fullName)}
            <Text style={Style.textLabel}>
              <I18n {...translation.yourEmail} />
            </Text>
            <View style={Style.inputTextWrapper}>
              <TextInput
                value={email.value}
                onChangeText={email.changeModel}
                style={Style.inputTextMonoLine}
                placeholder={i18n.t(translation.typeYourEmail.id)}
                placeholderTextColor={colors.GRAY}
              />
            </View>
            {inputErrors(email)}
          </View>
        )}
        <Text style={Style.textLabel}>
          <I18n {...translation.yourMessage} />
        </Text>
        <View style={Style.inputTextWrapper}>
          <TextInput
            value={message.value}
            onChangeText={message.changeModel}
            style={Style.inputTextMultiline}
            placeholder={i18n.t(translation.typeYourMessage.id)}
            multiline={true}
            numberOfLines={20}
            textAlignVertical={'top'}
            placeholderTextColor={colors.GRAY}
          />
        </View>
        {inputErrors(message)}
        <Text style={Style.textAgreement}>
          <I18n {...translation.bySubmitting} />
        </Text>
        <Button
          title={i18n.t(translation.send.id)}
          size={size}
          onPress={onPressSendMessageHandler}
        />
        <View style={Style.bottomContainer}>
          <Email />
          <Text style={Style.textScreenTitle}>
            <I18n {...translation.emailUs} />
          </Text>
          <Text style={Style.textBottom}>
            <I18n {...translation.emailUsFor} />
          </Text>
          <Text style={[Style.textBottom, Style.textBold]}>{WELINA_EMAIL}</Text>
          <Pressable onPress={openPhoneComposer}>
            <Phone />
          </Pressable>
          <Text style={Style.textScreenTitle}>
            <I18n {...translation.callUs} />
          </Text>
          <Text style={Style.textBottom}>
            <I18n {...translation.callUsToSpeak} />
          </Text>
          <Pressable onPress={openPhoneComposer}>
            <Text style={[Style.textBottom, Style.textBold]}>
              {WELINA_PHONE}
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <ProgressLoader
        visible={isLoading}
        isModal={true}
        isHUD={true}
        hudColor={colors.SECONDARY}
        color={colors.PRIMARY}
      />
    </ScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  isLoading: getContactUsLoaderSelector(),
  successModalVisibility: getSuccessModalVisibilitySelector(),
  successMessage: getMessageSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      postEmail,
      openSuccessModalAction,
      closeSuccessModalAction,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ContactUs);
