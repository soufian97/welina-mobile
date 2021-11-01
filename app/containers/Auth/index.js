import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ScrollView, Dimensions, Text, View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getLoadingSelector } from './store/selectors';
import {
  createAccount,
  verifyOTP,
  verifyPhoneNumber,
  resetPassword,
  checkCurrent,
} from './store/actions.creator';
import { useInjectSaga } from '../../utils/store/injectSaga';
import detailsSagaConfig from '../OfferDetails/store/saga';

import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import {
  signIn,
  openToast,
  setDateToShoWFeedBackModal,
} from '../Splash/store/actions.creator';
import { getHomeLoaderSelector } from '../Splash/store/selectors';
import {
  USER_NOT_ACTIVE,
  PHONE_NUMBER_REQUIRED,
} from '../../utils/http/errorCodes';
import {
  stringNotBlank,
  emailValidator,
  phoneValidator,
  fieldsEqualValidator,
  lengthValidator,
  uppercaseValidator,
  lowercaseValidator,
  numberValidator,
} from '../../utils/validators';
import { useForm } from '../../utils/hooks';
import PhoneVerification from './component/PhoneVerification';
import i18n from '../../config/i18n';
import { translation } from './messages';
import { Style } from './component/SignUp/style';
import { getToken } from '../Discussion/store/actions.creator';
import { routes } from '../../utils/navigation/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  SUCCESS,
  MALE,
  FEMALE,
  OTHER,
  FEEDBACK_MODAL_STORAGE_KEY,
  ERROR_MODAL,
} from '../../config/app.constant';
import { addDays } from 'date-fns';
import FullScreenLoader from '../../components/FullScreenLoader';
import { openModal } from '../Modal/store/actions.creator';

const { width } = Dimensions.get('window');

const tabs = [
  { title: i18n.t(translation.male.id), value: MALE },
  { title: i18n.t(translation.female.id), value: FEMALE },
  { title: i18n.t(translation.other.id), value: OTHER },
];

const Auth = ({
  createAccount,
  verifyPhoneNumber,
  verifyOTP,
  signIn,
  resetPassword,
  signInLoader,
  signUpLoader,
  navigation,
  route,
  getToken,
  checkCurrent,
  openToast,
  setDateToShoWFeedBackModal,
  openModal,
}) => {
  useInjectSaga(detailsSagaConfig);

  const intentRoute = route.params?.intent;
  const scrollRef = useRef(null);
  const [selectedInterval, setSelectedInterval] = useState(0);
  const [formState, changeFormState] = useState({
    signInDirty: false,
    signUpDirty: false,
    isSucceeded: false,
    isSubmitting: false,
    rootCause: null,
  });

  useEffect(() => {
    scrollRef.current.scrollTo({
      x: selectedInterval,
      y: 0,
      animated: true,
    });
  }, [selectedInterval]);

  useEffect(() => {
    if (route?.params?.selectedInterval) {
      setSelectedInterval(route?.params?.selectedInterval);
    }
  }, [route]);

  const handleChangeTab = (interval) => () => {
    setSelectedInterval(interval);
  };

  const [signInCountryVisibility, setSignInCountryVisibility] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [countryCallCode, setCountryCallCode] = useState('+212');
  const [countryCode, setCountryCode] = useState('MA');
  const [flatListIndex, setFlatListIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(-1);

  const signInPassword = useForm('signInPassword', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'password' }),
    ),
  ]);
  const signInNewPassword = useForm('signInNewPassword', '', [
    lengthValidator(),
    uppercaseValidator(),
    lowercaseValidator(),
    numberValidator(),
  ]);
  const signInNewPasswordVerify = useForm('signInNewPasswordVerify', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'password' }),
    ),
    fieldsEqualValidator(
      signInNewPassword.value,
      i18n.t(translation.didnotMatch.id),
    ),
  ]);

  const phoneNumber = useForm('phoneNumber', '', [
    phoneValidator(i18n.t(translation.phoneNumberError.id)),
  ]);

  const firstName = useForm('firstName', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'First name' }),
    ),
  ]);

  const lastName = useForm('lastName', '', [
    stringNotBlank(
      i18n.t(translation.stringBlankError.id, { name: 'Last name' }),
    ),
  ]);

  const email = useForm('email', '', [
    stringNotBlank(i18n.t(translation.stringBlankError.id, { name: 'Email' })),
    emailValidator(i18n.t(translation.emailFormatError.id)),
  ]);

  const password = useForm('password', '', [
    lengthValidator(),
    uppercaseValidator(),
    lowercaseValidator(),
    numberValidator(),
  ]);

  const otp = useForm('otp', '', [stringNotBlank()]);

  const getNextNavigationDestination = useCallback(() => {
    return intentRoute?.route
      ? navigation.replace(intentRoute?.route, { ...intentRoute.params })
      : navigation.replace(routes.SPLASH);
  }, [intentRoute, navigation]);

  const signInCheckCurrentCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        getNextNavigationDestination();
      }
    },
    [getNextNavigationDestination, openModal],
  );

  const getTokenCallback = useCallback(
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

  const signInCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        getToken(getTokenCallback);
        checkCurrent(signInCheckCurrentCallback);
      }
    },
    [
      openModal,
      getToken,
      getTokenCallback,
      checkCurrent,
      signInCheckCurrentCallback,
    ],
  );

  const signInOnCreateCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        setDateToShoWFeedBackModal(
          { key: FEEDBACK_MODAL_STORAGE_KEY, value: addDays(new Date(), 2) },
          () => {},
        );
        checkCurrent(signInCheckCurrentCallback);
      }
    },
    [
      openModal,
      setDateToShoWFeedBackModal,
      checkCurrent,
      signInCheckCurrentCallback,
    ],
  );

  const onPressSignInHandler = useCallback(() => {
    changeFormState({ ...formState, signInDirty: true });
    if (!phoneNumber.hasErrors && !signInPassword.hasErrors) {
      markFormStateDirtyAndPending();
      const formPayload = {
        username: `${countryCallCode}${phoneNumber.value}`,
        password: signInPassword.value,
      };
      signIn(formPayload, signInCallback);
    }
  }, [
    formState,
    phoneNumber.hasErrors,
    phoneNumber.value,
    signInPassword.hasErrors,
    signInPassword.value,
    countryCallCode,
    signIn,
    signInCallback,
  ]);

  const onCloseCountryPicker = useCallback(() => {
    setSignInCountryVisibility(false);
  }, []);

  const onOpenCountryPicker = useCallback(() => {
    setSignInCountryVisibility(true);
  }, []);

  const onSelectHandler = useCallback((country) => {
    setCountryCallCode(`+${country.callingCode}`);
    setCountryCode(country.cca2);
  }, []);

  const forgotPasswordModal = useCallback(() => {
    setIsResetPassword(true);
    setPhoneVerificationModalVisibility(true);
  }, []);

  const forgotPasswordModalClose = useCallback(() => {
    setIsResetPassword(false);
    setPhoneVerificationModalVisibility(false);
  }, []);

  const phoneNumberVerificationCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        setFlatListIndex(1);
      }
    },
    [openModal],
  );

  const onPressForgotVerifyPhoneNumberHandler = useCallback(() => {
    const formPayload = {
      phoneNumber: `${countryCallCode}${phoneNumber.value}`,
    };

    verifyPhoneNumber(formPayload, phoneNumberVerificationCallback);
  }, [
    countryCallCode,
    phoneNumber.value,
    verifyPhoneNumber,
    phoneNumberVerificationCallback,
  ]);

  const resetPasswordCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        signIn(
          {
            username: `${countryCallCode}${phoneNumber.value}`,
            password: signInNewPassword.value,
          },
          signInCallback,
        );
        openToast({
          title: i18n.t(translation.huray.id),
          body: i18n.t(translation.passwordSuccessefullyReseted.id),
          type: SUCCESS,
        });
      }
    },
    [
      countryCallCode,
      openModal,
      signIn,
      signInCallback,
      signInNewPassword.value,
      phoneNumber.value,
      openToast,
    ],
  );

  const forgotVerifyOtpCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        setFlatListIndex(2);
      }
    },
    [openModal],
  );

  const onPressForgotVerifyOtpHandler = useCallback(() => {
    verifyOTP(
      {
        otp: otp.value,
        phoneNumber: `${countryCallCode}${phoneNumber.value}`,
      },
      forgotVerifyOtpCallback,
    );
  }, [
    countryCallCode,
    forgotVerifyOtpCallback,
    otp.value,
    phoneNumber.value,
    verifyOTP,
  ]);

  const onPressVerifyPassword = useCallback(() => {
    resetPassword(
      {
        phoneNumber: `${countryCallCode}${phoneNumber.value}`,
        newPassword: signInNewPassword.value,
      },
      resetPasswordCallback,
    );
  }, [
    countryCallCode,
    resetPassword,
    resetPasswordCallback,
    signInNewPassword.value,
    phoneNumber.value,
  ]);

  const [
    phoneVerificationModalVisibility,
    setPhoneVerificationModalVisibility,
  ] = useState(false);

  const markFormStateDirtyAndPending = () => {
    changeFormState({
      dirty: true,
      isSubmitting: true,
      isSucceeded: false,
    });
  };

  const phoneVerificationModalOpen = useCallback(() => {
    setPhoneVerificationModalVisibility(true);
  }, []);

  const createAccountCallback = useCallback(
    (err) => {
      if (err) {
        switch (err.response.code) {
          case USER_NOT_ACTIVE:
          case PHONE_NUMBER_REQUIRED: {
            phoneVerificationModalOpen();
            break;
          }
          default: {
            setFlatListIndex(0);
            openModal(ERROR_MODAL, {
              error: err?.response?.code,
              withBackground: false,
            });
          }
        }
      } else {
        phoneVerificationModalOpen();
      }
    },
    [openModal, phoneVerificationModalOpen],
  );

  const onChangeHandler = useCallback(
    (notify) => (value) => {
      notify(value);
    },
    [],
  );

  const phoneVerificationModalClose = useCallback(() => {
    setPhoneVerificationModalVisibility(false);
  }, []);

  const onPressCreateAccountHandler = useCallback(() => {
    changeFormState({ ...formState, signUpDirty: true });
    if (
      !firstName.hasErrors &&
      !lastName.hasErrors &&
      !email.hasErrors &&
      !password.hasErrors
    ) {
      markFormStateDirtyAndPending();
      const formPayload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        gender: selectedTab < 0 ? OTHER : tabs[selectedTab].value,
      };
      createAccount(formPayload, createAccountCallback);
    }
  }, [
    createAccount,
    createAccountCallback,
    email.hasErrors,
    email.value,
    firstName.hasErrors,
    firstName.value,
    formState,
    lastName.hasErrors,
    lastName.value,
    password.hasErrors,
    password.value,
    selectedTab,
  ]);

  const onPressVerifyPhoneNumberHandler = useCallback(() => {
    const formPayload = {
      phoneNumber: `${countryCallCode}${phoneNumber.value}`,
      email: email.value,
    };
    verifyPhoneNumber(formPayload, phoneNumberVerificationCallback);
  }, [
    countryCallCode,
    email.value,
    phoneNumber.value,
    phoneNumberVerificationCallback,
    verifyPhoneNumber,
  ]);

  const otpVerificationCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        phoneVerificationModalClose();
        const formPayload = {
          username: `${countryCallCode}${phoneNumber.value}`,
          password: password.value,
        };
        signIn(formPayload, signInOnCreateCallback);
      }
    },
    [
      openModal,
      phoneVerificationModalClose,
      countryCallCode,
      phoneNumber.value,
      password.value,
      signIn,
      signInOnCreateCallback,
    ],
  );

  const onPressVerifyOtpHandler = useCallback(() => {
    const formPayload = {
      otp: otp.value,
      email: email.value,
      phoneNumber: `${countryCallCode}${phoneNumber.value}`,
    };

    verifyOTP(formPayload, otpVerificationCallback);
  }, [
    countryCallCode,
    email.value,
    otp.value,
    otpVerificationCallback,
    phoneNumber.value,
    verifyOTP,
  ]);

  const inputErrors = (formStateDirty) => (value) => {
    const hasErrors = formStateDirty && value.hasErrors;
    if (hasErrors) {
      return <Text style={Style.textError}>{value.errors[0]}</Text>;
    }
    return null;
  };

  const onChangeCountryCallCode = useCallback((value) => {
    setCountryCallCode(value);
  }, []);

  const onChangeCountryCode = useCallback((value) => {
    setCountryCode(value);
  }, []);

  return (
    <>
      {phoneVerificationModalVisibility && (
        <View style={Style.phoneVerificationTopContainer}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            enableAutomaticScroll={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <PhoneVerification
              phoneNumber={phoneNumber}
              otp={otp}
              newPasswordValue={signInNewPassword}
              newPasswordValueVerify={signInNewPasswordVerify}
              onChangeHandler={onChangeHandler}
              onChangeCountryCallCode={onChangeCountryCallCode}
              countryCode={countryCode}
              setCountryCode={onChangeCountryCode}
              countryCallCode={countryCallCode}
              onPressVerifyPassword={onPressVerifyPassword}
              flatListIndex={flatListIndex}
              setFlatListIndex={setFlatListIndex}
              isResetPassword={isResetPassword}
              closeModal={
                isResetPassword
                  ? forgotPasswordModalClose
                  : phoneVerificationModalClose
              }
              onPressVerifyPhoneNumber={
                isResetPassword
                  ? onPressForgotVerifyPhoneNumberHandler
                  : onPressVerifyPhoneNumberHandler
              }
              onPressVerifyOtp={
                isResetPassword
                  ? onPressForgotVerifyOtpHandler
                  : onPressVerifyOtpHandler
              }
            />
          </KeyboardAwareScrollView>
        </View>
      )}
      <ScrollView
        ref={scrollRef}
        horizontal
        bounces={false}
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
      >
        <SignIn
          onSignUpPress={handleChangeTab(width)}
          onPressSignIn={onPressSignInHandler}
          onPressForgotPassword={forgotPasswordModal}
          onCloseCountryPicker={onCloseCountryPicker}
          onOpenCountryPicker={onOpenCountryPicker}
          onSelectHandler={onSelectHandler}
          signInUsername={phoneNumber}
          signInPassword={signInPassword}
          onChangeText={onChangeHandler}
          countryVisibility={signInCountryVisibility}
          countryCallCode={countryCallCode}
          countryCode={countryCode}
          inputErrors={inputErrors(formState.signInDirty)}
        />
        <SignUp
          onSignInPress={handleChangeTab(0)}
          onPressCreateAccount={onPressCreateAccountHandler}
          inputErrors={inputErrors(formState.signUpDirty)}
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          onChangeText={onChangeHandler}
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </ScrollView>
      <FullScreenLoader visible={signInLoader || signUpLoader} />
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  signInLoader: getHomeLoaderSelector(),
  signUpLoader: getLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signIn,
      createAccount,
      verifyOTP,
      verifyPhoneNumber,
      resetPassword,
      getToken,
      checkCurrent,
      openToast,
      setDateToShoWFeedBackModal,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Auth);
