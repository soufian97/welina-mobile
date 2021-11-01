import React, { useCallback, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Style } from './style';
import { MapPin } from '../../assets/svgs';
import { colors } from '../../utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Buttons/Button';
import { useForm } from '../../utils/hooks';
import {
  stringNotBlank,
  birthdayValidator,
  emailValidator,
  phoneWithCountryCodeValidator,
  lengthValidator,
  uppercaseValidator,
  lowercaseValidator,
  numberValidator,
} from '../../utils/validators';
import i18n from '../../config/i18n';
import I18n from '../../components/I18n';
import { translation } from './messages';
import InputCustom from '../../components/Inputs/InputCustom';
import { routes } from '../../utils/navigation/routes';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../Auth/store/selectors';
import { coachUpdateInfo } from './store/actions.creator';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { useInjectReducer } from '../../utils/store/injectReducer';
import coachUpdateInfoReducerConfig from './store/reducer';
import coachUpdateInfoSagaConfig from './store/saga';
import { checkCurrent } from '../Auth/store/actions.creator';
import { openToast } from '../Splash/store/actions.creator';
import ImagePicker from 'react-native-image-crop-picker';
import { ERROR_MODAL, PHOTO, SUCCESS } from '../../config/app.constant';
import { isEmpty } from 'lodash';
import { API_URL } from '../../utils/http/http';
import { verifyPhoneNumber, verifyOTP } from '../Auth/store/actions.creator';
const localhostLink = 'http://localhost:8080/api/v1';
import OtpVerification from '../../components/OtpVerification';
import { getLoadingSelector } from './store/selectors';
import ProfilePictureWithData from './components/ProfilePictureWithData';
import ProfilePictureNoData from './components/ProfilePictureNoData';
import CoverPictureWithData from './components/CoverPictureWithData';
import CoverPictureNoData from './components/CoverPictureNoData';
import { openModal } from '../Modal/store/actions.creator';
import FullScreenLoader from '../../components/FullScreenLoader';

const { width, height } = Dimensions.get('window');

const buttonSize = {
  width: width * 0.8,
  height: height * 0.06,
  font: 18,
  radius: 10,
};

export const CoachUpdateProfile = ({
  navigation,
  currentUser,
  coachUpdateInfo,
  checkCurrent,
  openToast,
  verifyOTP,
  verifyPhoneNumber,
  loading,
  openModal,
}) => {
  useInjectReducer(coachUpdateInfoReducerConfig);
  useInjectSaga(coachUpdateInfoSagaConfig);
  const [collapse, setCollapse] = useState(false);
  const [
    otpVerificationModalVisibility,
    setOtpVerificationModalVisibility,
  ] = useState(false);

  const [phoneLoading, setPhoneLoading] = useState(false);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
  const phoneNumber = useForm('phoneNumber', currentUser?.phoneNumber, [
    phoneWithCountryCodeValidator(i18n.t(translation.phoneNumberError.id)),
  ]);

  const city = useForm('city', currentUser?.city, [
    stringNotBlank(i18n.t(translation.stringBlankError.id, { name: 'city' })),
  ]);
  const birthday = useForm('birthday', currentUser?.birthday, [
    birthdayValidator(i18n.t(translation.birthdayFormatError.id)),
  ]);
  const email = useForm('email', currentUser?.email, [
    emailValidator(i18n.t(translation.emailFormatError.id)),
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

  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);

  const inputs = [
    {
      label: i18n.t(translation.firstName.id),
      placeholder: i18n.t(translation.firstName.id),
      value: firstName,
      editable: true,
    },
    {
      label: i18n.t(translation.lastName.id),
      placeholder: i18n.t(translation.lastName.id),
      value: lastName,
      editable: true,
    },
    {
      label: i18n.t(translation.email.id),
      placeholder: i18n.t(translation.email.id),
      value: email,
      editable: false,
    },
    {
      label: i18n.t(translation.phoneNumber.id),
      placeholder: i18n.t(translation.phoneNumber.id),
      value: phoneNumber,
      editable: true,
    },
    {
      label: i18n.t(translation.city.id),
      placeholder: i18n.t(translation.city.id),
      value: city,
      editable: true,
    },
    {
      label: i18n.t(translation.birthday.id),
      placeholder: 'YYYY-MM-DD',
      value: birthday,
      editable: true,
    },
  ];

  const uploadProfileImageHandler = useCallback(async () => {
    const image = await ImagePicker.openPicker({
      width: width,
      height: width,
      mediaType: PHOTO,
      includeBase64: true,
      cropping: true,
    });
    setProfilePicture(image);
  }, []);

  const uploadCoverImageHandler = useCallback(async () => {
    const image = await ImagePicker.openPicker({
      width: width * 1.5,
      height: height / 3,
      cropping: true,
      mediaType: PHOTO,
      includeBase64: true,
    });
    setCoverPicture(image);
  }, []);

  const removeProfileImageHandler = useCallback(() => {
    currentUser?.photo ? uploadProfileImageHandler() : setProfilePicture(null);
  }, [currentUser, uploadProfileImageHandler]);

  const removeCoverImageHandler = useCallback(() => {
    currentUser?.coverPicture
      ? uploadCoverImageHandler()
      : setCoverPicture(null);
  }, [currentUser, uploadCoverImageHandler]);

  const checkCurrentCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        openToast({
          title: i18n.t(translation.profileSuccessefullyUpdatedTitle.id),
          body: i18n.t(translation.profileSuccessefullyUpdatedBody.id),
          type: SUCCESS,
        });
      }
    },
    [openModal, openToast],
  );

  const updateCoachInformationCallback = useCallback(
    (err) => {
      if (otpVerificationModalVisibility) {
        setOtpVerificationModalVisibility(false);
      }
      if (!err) {
        checkCurrent(checkCurrentCallback);
        navigation.navigate(routes.COACH_PROFILE);
      } else {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [
      checkCurrent,
      checkCurrentCallback,
      navigation,
      openModal,
      otpVerificationModalVisibility,
    ],
  );

  const closeOtpVerificationModalHandler = useCallback(
    () => setOtpVerificationModalVisibility(false),
    [],
  );

  const hasPasswordChange = useCallback(
    () => !isEmpty(newPassword.value) || !isEmpty(oldPassword.value),
    [newPassword.value, oldPassword.value],
  );

  const hasPasswordErrors = useCallback(
    () =>
      hasPasswordChange()
        ? newPassword.hasErrors && oldPassword.hasErrors
        : false,
    [hasPasswordChange, newPassword.hasErrors, oldPassword.hasErrors],
  );

  const verifyPhoneNumberCallback = useCallback(
    (err) => {
      setPhoneLoading(false);
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

  const handleUpdateProfile = useCallback(() => {
    const values = {
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      photo: profilePicture,
      coverPicture: coverPicture,
      email: currentUser?.email,
      city: city.value,
      birthday: birthday.value,
      currentPassword: oldPassword.value,
      newPassword: newPassword.value,
    };
    if (
      !firstName.hasErrors &&
      !lastName.hasErrors &&
      !phoneNumber.hasErrors &&
      !hasPasswordErrors()
    ) {
      if (currentUser?.phoneNumber !== phoneNumber.value) {
        setPhoneLoading(true);
        verifyPhoneNumber(
          { phoneNumber: phoneNumber.value, email: email.value },
          verifyPhoneNumberCallback,
        );
      } else {
        coachUpdateInfo(values, updateCoachInformationCallback);
      }
    }
  }, [
    firstName,
    lastName,
    phoneNumber,
    profilePicture,
    coverPicture,
    currentUser,
    city.value,
    birthday.value,
    email.value,
    oldPassword,
    newPassword,
    hasPasswordErrors,
    verifyPhoneNumberCallback,
    updateCoachInformationCallback,
    coachUpdateInfo,
    verifyPhoneNumber,
  ]);

  const renderInputError = (item) => {
    if (item.value.dirty && !isEmpty(item.value.errors)) {
      return item.value.errors[0];
    }
    return null;
  };

  const inputErrors = (value) => {
    const hasErrors = value.dirty && value.hasErrors;
    if (hasErrors) {
      return <Text style={Style.inputError}>{value.errors[0]}</Text>;
    }
    return null;
  };

  const renderInputs = () => {
    return inputs.map((item) => (
      <View key={item.placeholder}>
        <Text style={Style.inputLabel}>{item.label}</Text>
        <InputCustom
          customValue={item.value}
          placeholder={item.placeholder}
          customStyle={Style.inputContainer}
          editable={item.editable}
        />
        <Text style={Style.inputError}>{renderInputError(item)}</Text>
      </View>
    ));
  };

  const renderCoverPicture = () => {
    if (coverPicture) {
      return (
        <CoverPictureWithData
          data={coverPicture.path}
          handleGoBack={handleGoBack}
          removeCoverImageHandler={removeCoverImageHandler}
          uploadCoverImageHandler={uploadCoverImageHandler}
        />
      );
    } else if (currentUser?.coverPicture) {
      return (
        <CoverPictureWithData
          data={currentUser?.coverPicture.replace(localhostLink, API_URL)}
          handleGoBack={handleGoBack}
          removeCoverImageHandler={removeCoverImageHandler}
          uploadCoverImageHandler={uploadCoverImageHandler}
        />
      );
    }
    return (
      <CoverPictureNoData
        uploadCoverImageHandler={uploadCoverImageHandler}
        handleGoBack={handleGoBack}
      />
    );
  };

  const renderProfilePicture = () => {
    if (profilePicture) {
      return (
        <ProfilePictureWithData
          data={profilePicture.path}
          removeProfileImageHandler={removeProfileImageHandler}
        />
      );
    } else if (currentUser?.photo) {
      return (
        <ProfilePictureWithData
          data={currentUser?.photo.replace(localhostLink, API_URL)}
          removeProfileImageHandler={removeProfileImageHandler}
        />
      );
    }
    return <ProfilePictureNoData />;
  };

  const verifyOtpCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        const values = {
          firstName: firstName.value,
          lastName: lastName.value,
          phoneNumber: phoneNumber.value,
          photo: profilePicture,
          coverPicture: coverPicture,
          email: currentUser?.email,
          city: city.value,
          birthday: birthday.value,
          currentPassword: oldPassword.value,
          newPassword: newPassword.value,
        };
        coachUpdateInfo(values, updateCoachInformationCallback);
      }
    },
    [
      openModal,
      firstName.value,
      lastName.value,
      phoneNumber.value,
      profilePicture,
      coverPicture,
      currentUser,
      city.value,
      birthday.value,
      oldPassword,
      newPassword,
      coachUpdateInfo,
      updateCoachInformationCallback,
    ],
  );

  const onPressVerifyOtpHandler = useCallback(() => {
    verifyOTP(
      { otp: otp.value, phoneNumber: currentUser?.phoneNumber },
      verifyOtpCallback,
    );
  }, [currentUser, otp.value, verifyOTP, verifyOtpCallback]);

  const onChangeHandler = useCallback(
    (notify) => (value) => {
      notify(value);
    },
    [],
  );

  return (
    <View style={Style.container}>
      {otpVerificationModalVisibility && (
        <View style={Style.otpModalContainer}>
          <OtpVerification
            otpValue={otp}
            onChangeOtpText={onChangeHandler(otp.changeModel)}
            onPressArrowHandler={closeOtpVerificationModalHandler}
            onPressVerifyOtp={onPressVerifyOtpHandler}
          />
        </View>
      )}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {renderCoverPicture()}
        <TouchableOpacity
          style={Style.profilePicture}
          onPress={uploadProfileImageHandler}
        >
          {renderProfilePicture()}
        </TouchableOpacity>
        <View style={Style.generalInfoContainer}>
          <Text style={Style.fullNameText}>
            {`${currentUser?.lastName} ${currentUser?.firstName}`}
          </Text>
          <Text style={Style.coachTitle}>
            <I18n {...translation.coachTitle} />
          </Text>
          {currentUser?.city && (
            <View style={Style.locationContainer}>
              <MapPin width={12} height={15} color={colors.SECONDARY_LIGHT} />
              <Text style={Style.locationText}>{currentUser.city}</Text>
            </View>
          )}
        </View>
        <View style={Style.inputsContainer}>
          {renderInputs()}
          {!collapse ? (
            <>
              <Text style={Style.inputLabel}>
                {i18n.t(translation.password.id)}
              </Text>
              <TouchableOpacity onPress={() => setCollapse(true)}>
                <View style={Style.inputContainer}>
                  <View style={Style.dotContainer}>
                    {Array(7)
                      .fill(0)
                      .map((_, index) => (
                        <View style={Style.dot} key={`${index}`} />
                      ))}
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={Style.inputLabel}>
                {i18n.t(translation.oldPassword.id)}
              </Text>
              <InputCustom
                customValue={oldPassword}
                placeholder={i18n.t(translation.oldPassword.id)}
                customStyle={Style.inputContainer}
                secure={true}
              />
              {inputErrors(oldPassword)}
              <Text style={Style.inputLabel}>
                {i18n.t(translation.newPassword.id)}
              </Text>
              <InputCustom
                customValue={newPassword}
                placeholder={i18n.t(translation.newPassword.id)}
                customStyle={Style.inputContainer}
                secure={true}
              />
              {inputErrors(newPassword)}
            </>
          )}
          <View style={Style.updateButton}>
            <Button
              title={i18n.t(translation.updateProfile.id)}
              size={buttonSize}
              onPress={handleUpdateProfile}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <FullScreenLoader visible={loading || phoneLoading} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  loading: getLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      coachUpdateInfo,
      checkCurrent,
      openToast,
      verifyOTP,
      verifyPhoneNumber,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(CoachUpdateProfile);
