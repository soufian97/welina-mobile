import React, { useRef, useState, useCallback } from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Button from '../../components/Buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../utils/colors';
import ProgressLoader from 'rn-progress-loader';
import mapsStyle from '../../utils/mapsStyle';
import GoBackHeader from '../../components/Headers/GobackHeader';
import i18n from '../../config/i18n';
import I18n from '../../components/I18n';
import { translation } from './message';
import { openToast } from '../Splash/store/actions.creator';
import { checkCurrent } from '../Auth/store/actions.creator';
import { updateInfo } from './store/actions.creator';
import { verifyPhoneNumber, verifyOTP } from '../Auth/store/actions.creator';
import { getLoadingSelector as getVerificationLoadingSelector } from '../Auth/store/selectors';
import { getCurrentUser } from '../Auth/store/selectors';
import { getLoadingSelector } from './store/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { Style } from './style';
import updateInfoReducerConfig from './store/reducer';
import updateInfoSagaConfig from './store/saga';

import { useForm } from '../../utils/hooks';
import {
  stringNotBlank,
  phoneWithCountryCodeValidator,
  lengthValidator,
  uppercaseValidator,
  lowercaseValidator,
  numberValidator,
} from '../../utils/validators';
import { EditInfo, BlurUploadIcon } from '../../assets/svgs';
import InputIcon from '../../components/Inputs/InputIcon';
import OtpVerification from '../../components/OtpVerification';
import { isEmpty } from 'lodash';
import {
  CURRENCY,
  ERROR_MODAL,
  LOCALHOST_LINK,
  PHOTO,
  SUCCESS,
} from '../../config/app.constant';
import { UnselectedCheckbox, SelectedCheckbox } from '../../assets/svgs';
import { API_URL } from '../../utils/http/http';
import ImagePicker from 'react-native-image-crop-picker';
import mrc_flag from '../../assets/images/mrc-flag.png';
import euro_flag from '../../assets/images/euro-flag.png';
import { openModal } from '../Modal/store/actions.creator';

const { width } = Dimensions.get('window');
const UpdateInfo = ({
  currentUser,
  checkCurrent,
  verifyOTP,
  verifyPhoneNumber,
  isVerificationLoading,
  updateInfo,
  openToast,
  openModal,
}) => {
  useInjectReducer(updateInfoReducerConfig);
  useInjectSaga(updateInfoSagaConfig);

  const [loading, setLoading] = useState(false);

  const _map = useRef(null);
  const initialRegion = {
    latitude: 33.597739,
    longitude: -7.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
  const size = { radius: 10, height: 56 };
  const firstName = useForm('firstName', currentUser?.firstName, [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'first name' }),
    ),
  ]);
  const lastName = useForm('lastName', currentUser?.lastName, [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'last name' }),
    ),
  ]);
  const email = useForm('email', currentUser?.email, [
    stringNotBlank(i18n.t(translation.stringBlankError.id, { name: 'email' })),
  ]);
  const phoneNumber = useForm('phoneNumber', currentUser?.phoneNumber, [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'phoneNumber' }),
    ),
    phoneWithCountryCodeValidator(i18n.t(translation.phoneNumberError.id)),
  ]);
  const oldPassword = useForm('oldPassword', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'password' }),
    ),
  ]);
  const newPassword = useForm('newPassword', '', [
    lengthValidator(),
    uppercaseValidator(),
    lowercaseValidator(),
    numberValidator(),
  ]);
  const otp = useForm('otp', '', [stringNotBlank()]);
  const [collapse, setCollapse] = useState(false);

  const [formState, changeFormState] = useState({
    dirty: false,
    isSucceeded: false,
    isSubmitting: false,
    rootCause: null,
  });
  const [
    otpVerificationModalVisibility,
    setOtpVerificationModalVisibility,
  ] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [enableNotification, setEnableNotification] = useState(
    currentUser?.acceptsNotifications,
  );
  const [currency, setCurrency] = useState(
    currentUser?.currency || CURRENCY.MAD,
  );
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

  const closeOtpVerificationModalHandler = useCallback(
    () => setOtpVerificationModalVisibility(false),
    [],
  );

  const checkCurrentCallback = useCallback(
    (err) => {
      if (err && err?.response?.code) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [openModal],
  );

  const updateInfoCallback = useCallback(
    (err) => {
      setLoading(false);
      if (otpVerificationModalVisibility) {
        setOtpVerificationModalVisibility(false);
      }
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        openToast({
          title: i18n.t(translation.huray.id),
          body: i18n.t(translation.informationsSuccessefullyUpdated.id),
          type: SUCCESS,
        });
        emptyPassword();
        setProfilePhoto(null);
        checkCurrent(checkCurrentCallback);
      }
    },
    [
      checkCurrent,
      checkCurrentCallback,
      emptyPassword,
      openModal,
      otpVerificationModalVisibility,
      openToast,
    ],
  );

  const emptyPassword = useCallback(() => {
    newPassword.changeModel('');
    oldPassword.changeModel('');
    setCollapse(false);
    changeFormState({ ...formState, dirty: false });
  }, [formState, newPassword, oldPassword]);

  const verifyPhoneNumberCallback = useCallback(
    (err) => {
      setLoading(false);
      if (!err) {
        setOtpVerificationModalVisibility(true);
      } else {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [openModal],
  );

  const verifyOtpCallback = useCallback(
    (err) => {
      setLoading(false);
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        updateInfo(
          {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            ...getPasswordField(),
            currency,
            acceptsNotifications: enableNotification,
            photo: profilePhoto ? profilePhoto : null,
          },
          updateInfoCallback,
        );
      }
    },
    [
      openModal,
      updateInfo,
      firstName.value,
      lastName.value,
      phoneNumber.value,
      getPasswordField,
      currency,
      enableNotification,
      profilePhoto,
      updateInfoCallback,
    ],
  );

  const onPressVerifyOtpHandler = useCallback(() => {
    setLoading(true);
    verifyOTP(
      { otp: otp.value, phoneNumber: currentUser?.phoneNumber },
      verifyOtpCallback,
    );
  }, [currentUser, otp.value, verifyOTP, verifyOtpCallback]);

  const hasPasswordErrors = useCallback(
    () =>
      hasPasswordChange()
        ? newPassword.hasErrors && oldPassword.hasErrors
        : false,
    [hasPasswordChange, newPassword.hasErrors, oldPassword.hasErrors],
  );
  const hasPasswordChange = useCallback(
    () => !isEmpty(newPassword.value) || !isEmpty(oldPassword.value),
    [newPassword.value, oldPassword.value],
  );
  const getPasswordField = useCallback(() => {
    if (hasPasswordChange()) {
      return {
        newPassword: newPassword.value,
        currentPassword: oldPassword.value,
      };
    } else {
      return null;
    }
  }, [hasPasswordChange, newPassword.value, oldPassword.value]);

  const onPressSaveInfoHandler = useCallback(() => {
    changeFormState({ ...formState, dirty: true });
    if (
      !firstName.hasErrors &&
      !lastName.hasErrors &&
      !phoneNumber.hasErrors &&
      !hasPasswordErrors()
    ) {
      setLoading(true);
      if (currentUser?.phoneNumber !== phoneNumber.value) {
        verifyPhoneNumber(
          { phoneNumber: phoneNumber.value, email: email.value },
          verifyPhoneNumberCallback,
        );
      } else {
        updateInfo(
          {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            ...getPasswordField(),
            currency,
            acceptsNotifications: enableNotification,
            photo: profilePhoto ? profilePhoto : null,
          },
          updateInfoCallback,
        );
      }
    }
  }, [
    formState,
    firstName.hasErrors,
    firstName.value,
    lastName.hasErrors,
    lastName.value,
    phoneNumber.hasErrors,
    phoneNumber.value,
    hasPasswordErrors,
    currentUser,
    verifyPhoneNumber,
    email.value,
    verifyPhoneNumberCallback,
    updateInfo,
    getPasswordField,
    currency,
    enableNotification,
    profilePhoto,
    updateInfoCallback,
  ]);
  const isChangesToSave = useCallback(() => {
    return (
      currentUser?.firstName !== firstName.value ||
      currentUser?.lastName !== lastName.value ||
      currentUser?.phoneNumber !== phoneNumber.value ||
      currentUser?.currency !== currency ||
      currentUser?.acceptsNotifications !== enableNotification ||
      profilePhoto ||
      hasPasswordChange()
    );
  }, [
    currency,
    currentUser,
    enableNotification,
    firstName.value,
    hasPasswordChange,
    lastName.value,
    phoneNumber.value,
    profilePhoto,
  ]);

  const buttonSaveDisabledHandler = useCallback(
    () =>
      isChangesToSave()
        ? [colors.PRIMARY_DARK, colors.PRIMARY]
        : [colors.GRAY, colors.GRAY],
    [isChangesToSave],
  );

  const renderCheckBox = (checkedCurrency) => {
    return checkedCurrency === currency ? (
      <SelectedCheckbox />
    ) : (
      <UnselectedCheckbox />
    );
  };

  const onCheckCurrencyHandler = useCallback(
    (currency) => () => {
      setCurrency(currency);
    },
    [],
  );

  const uploadProfileImageHandler = useCallback(async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: width,
        height: width,
        mediaType: PHOTO,
        includeBase64: true,
        cropping: true,
      });
      setProfilePhoto(image);
    } catch (_err) {}
  }, []);

  const renderProfilePhoto = useCallback(() => {
    if (profilePhoto) {
      return (
        <Image
          source={{
            uri: profilePhoto.path,
          }}
          style={Style.profileImage}
        />
      );
    } else if (currentUser?.photo) {
      return (
        <Image
          source={{
            uri: currentUser?.photo.replace(LOCALHOST_LINK, API_URL),
          }}
          style={Style.profileImage}
        />
      );
    }
    return <BlurUploadIcon />;
  }, [currentUser, profilePhoto]);

  return (
    <View style={Style.container}>
      {otpVerificationModalVisibility && (
        <View style={Style.otpModalVisibilityContainer}>
          <OtpVerification
            otpValue={otp}
            onChangeOtpText={onChangeHandler(otp.changeModel)}
            loading={isVerificationLoading}
            onPressArrowHandler={closeOtpVerificationModalHandler}
            onPressVerifyOtp={onPressVerifyOtpHandler}
          />
        </View>
      )}
      <MapView
        ref={_map}
        initialregion={initialRegion}
        style={Style.mapContainer}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapsStyle}
        maxzoomlevel={6}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <GoBackHeader />
          <View>
            <Text style={Style.textTitle}>
              <I18n {...translation.editPersonalInfo} />
            </Text>
          </View>
          <View style={Style.formContainer}>
            <View style={Style.imageProfileContainer}>
              <TouchableOpacity onPress={uploadProfileImageHandler}>
                {renderProfilePhoto()}
              </TouchableOpacity>
            </View>
            <InputIcon
              customStyle={Style.input}
              title={i18n.t(translation.firstName.id)}
              placeholder={i18n.t(translation.firstName.id)}
              customValue={firstName}
              onChangeText={onChangeHandler(firstName.changeModel)}
              inputErrors={inputErrors}
              icon={<EditInfo />}
            />
            <InputIcon
              customStyle={Style.input}
              title={i18n.t(translation.lastName.id)}
              placeholder={i18n.t(translation.lastName.id)}
              customValue={lastName}
              onChangeText={onChangeHandler(lastName.changeModel)}
              inputErrors={inputErrors}
              icon={<EditInfo />}
            />
            <InputIcon
              customStyle={Style.input}
              title={i18n.t(translation.email.id)}
              placeholder={i18n.t(translation.email.id)}
              customValue={email}
              onChangeText={onChangeHandler(email.changeModel)}
              inputErrors={inputErrors}
              editable={false}
            />
            {collapse ? (
              <>
                <InputIcon
                  title={i18n.t(translation.password.id)}
                  placeholder={i18n.t(translation.oldPassword.id)}
                  customValue={oldPassword}
                  onChangeText={onChangeHandler(oldPassword.changeModel)}
                  inputErrors={inputErrors}
                  icon={<EditInfo />}
                  secure={true}
                />
                <InputIcon
                  placeholder={i18n.t(translation.newPassword.id)}
                  customValue={newPassword}
                  onChangeText={onChangeHandler(newPassword.changeModel)}
                  inputErrors={inputErrors}
                  secure={true}
                />
              </>
            ) : (
              <TouchableOpacity onPress={() => setCollapse(true)}>
                <Text style={Style.textInputTitle}>
                  <I18n {...translation.password} />
                </Text>
                <View style={Style.inputContainer}>
                  <View style={Style.dotContainer}>
                    {Array(7)
                      .fill(0)
                      .map((_, index) => (
                        <View style={Style.dot} key={`${index}`} />
                      ))}
                  </View>
                  <EditInfo />
                </View>
              </TouchableOpacity>
            )}
            <InputIcon
              customStyle={Style.input}
              title={i18n.t(translation.phoneNumber.id)}
              placeholder={i18n.t(translation.phoneNumber.id)}
              customValue={phoneNumber}
              onChangeText={onChangeHandler(phoneNumber.changeModel)}
              inputErrors={inputErrors}
              icon={<EditInfo />}
            />
            <View style={Style.input}>
              <Text style={Style.textRegular}>
                <I18n {...translation.currency} />
              </Text>
              <View style={Style.inputFormData}>
                <TouchableOpacity
                  onPress={onCheckCurrencyHandler(CURRENCY.MAD)}
                  style={Style.checkedCurrency}
                >
                  {renderCheckBox(CURRENCY.MAD)}
                  <View style={Style.currencyContainer}>
                    <Image source={mrc_flag} style={Style.currencyIcon} />
                    <Text>{CURRENCY.MAD}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onCheckCurrencyHandler(CURRENCY.EURO)}
                  style={Style.checkedCurrency}
                >
                  {renderCheckBox(CURRENCY.EURO)}
                  <View style={Style.currencyContainer}>
                    <Image source={euro_flag} style={Style.currencyIcon} />
                    <Text>{CURRENCY.EURO}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={Style.input}>
              <Text style={Style.textRegular}>
                <I18n {...translation.notifications} />
              </Text>
              <View style={Style.inputFormData}>
                <Text style={Style.textRegular}>
                  <I18n {...translation.enableNotifications} />
                </Text>
                <Switch
                  value={enableNotification}
                  thumbColor={
                    enableNotification ? colors.PRIMARY : colors.WHITE
                  }
                  trackColor={{
                    true: colors.LIGHT_GRAY_BACKGROUND,
                    false: colors.BLACK_OPACITY,
                  }}
                  onValueChange={setEnableNotification}
                />
              </View>
            </View>
          </View>
          <Button
            containerStyle={Style.button}
            size={size}
            disabled={!isChangesToSave()}
            color={buttonSaveDisabledHandler()}
            title={i18n.t(translation.save.id)}
            onPress={onPressSaveInfoHandler}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
      <ProgressLoader
        visible={loading}
        isModal={true}
        isHUD={true}
        hudColor={colors.SECONDARY}
        color={colors.PRIMARY}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  isLoading: getLoadingSelector(),
  isVerificationLoading: getVerificationLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateInfo,
      verifyPhoneNumber,
      verifyOTP,
      checkCurrent,
      openToast,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateInfo);
