import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ModalHeader from '../../../../components/ModalHeader';
import { translation } from '../../messages';
import i18n from '../../../../config/i18n';
import I18n from '../../../../components/I18n';
import { Style } from './style';
import IconButton from '../../../../components/Buttons/IconButton';
import CountryPicker from 'react-native-country-picker-modal';
import { colors } from '../../../../utils/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import InputCustom from '../../../../components/Inputs/InputCustom';
import CountDown from 'react-native-countdown-component';
import { isEmpty } from 'lodash';

const { width } = Dimensions.get('screen');
const PhoneVerification = ({
  phoneNumber,
  otp,
  onChangeCountryCallCode,
  onPressVerifyPhoneNumber,
  onPressVerifyOtp,
  onPressVerifyPassword,
  closeModal,
  countryCallCode,
  countryCode,
  setCountryCode,
  flatListIndex,
  setFlatListIndex,
  newPasswordValue,
  newPasswordValueVerify,
  isResetPassword,
  onChangeHandler,
}) => {
  const [countryVisibility, setCountryVisibility] = useState(false);
  const flatListRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (flatListIndex !== 0) {
      phoneInputRef.current?.blur();
    }
  }, [flatListIndex]);

  useEffect(() => {
    flatListRef.current.scrollToIndex({ index: flatListIndex });
  }, [flatListIndex]);

  const onCloseCountryPicker = useCallback(() => {
    setCountryVisibility(false);
  }, []);

  const onOpenCountryPicker = useCallback(() => {
    setCountryVisibility(true);
  }, []);

  const onSelectHandler = useCallback(
    (country) => {
      onChangeCountryCallCode(`+${country.callingCode}`);
      setCountryCode(country.cca2);
    },
    [onChangeCountryCallCode, setCountryCode],
  );

  const getButtonPhoneVerificationState = useCallback(
    () => !phoneNumber.hasErrors,
    [phoneNumber.hasErrors],
  );

  const getButtonOtpState = useCallback(() => otp.value.length === 4, [
    otp.value.length,
  ]);

  const buttonPhoneVerificationDisabledHandler = useCallback(
    () =>
      getButtonPhoneVerificationState()
        ? [colors.PRIMARY_DARK, colors.PRIMARY]
        : [colors.GRAY, colors.GRAY],
    [getButtonPhoneVerificationState],
  );

  const getButtonPasswordMatchVerificationState = useCallback(
    () =>
      !newPasswordValue?.hasErrors &&
      !newPasswordValueVerify?.hasErrors &&
      newPasswordValue?.value === newPasswordValueVerify?.value,
    [newPasswordValue, newPasswordValueVerify],
  );

  const buttonPasswordMatchVerificationDisabledHandler = useCallback(
    () =>
      getButtonPasswordMatchVerificationState()
        ? [colors.PRIMARY_DARK, colors.PRIMARY]
        : [colors.GRAY, colors.GRAY],
    [getButtonPasswordMatchVerificationState],
  );
  const buttonOtpDisabledHandler = useCallback(
    () =>
      getButtonOtpState()
        ? [colors.PRIMARY_DARK, colors.PRIMARY]
        : [colors.GRAY, colors.GRAY],
    [getButtonOtpState],
  );
  const backToPhoneVerification = useCallback(() => {
    otp.changeModel('');
    setFlatListIndex(0);
  }, [otp, setFlatListIndex]);

  const backToOtpVerification = useCallback(() => {
    otp.changeModel('');
    setFlatListIndex(0);
  }, [otp, setFlatListIndex]);

  const onChangePasswordHandler = useCallback(
    (text) => {
      newPasswordValueVerify.changeModel('');
      onChangeHandler(newPasswordValue.changeModel)(text);
    },
    [newPasswordValue.changeModel, newPasswordValueVerify, onChangeHandler],
  );
  const RenderPhoneVerification = (
    <View style={Style.windowContainer}>
      <ModalHeader
        title={i18n.t(translation.didVeryWell.id)}
        onPressArrow={closeModal}
      />
      <Text style={Style.textSubTitle}>
        <I18n {...translation.enterPhone} />
      </Text>
      <View style={Style.phoneInputContainer}>
        <View style={Style.countryPickerContainer}>
          <CountryPicker
            visible={countryVisibility}
            onOpen={onOpenCountryPicker}
            onClose={onCloseCountryPicker}
            withCallingCode={true}
            withCountryNameButton={false}
            onSelect={onSelectHandler}
            countryCode={countryCode}
            withAlphaFilter={true}
            withFilter={true}
          />
          <Text style={Style.textStyle}>{countryCallCode}</Text>
        </View>
        <TextInput
          ref={phoneInputRef}
          keyboardType="numeric"
          placeholder={i18n.t(translation.phoneNumber.id)}
          placeholderTextColor={colors.GRAY}
          style={Style.textInputStyle}
          autoFocus={true}
          value={phoneNumber.value}
          onChangeText={onChangeHandler(phoneNumber.changeModel)}
        />
      </View>
      <IconButton
        color={buttonPhoneVerificationDisabledHandler()}
        title={i18n.t(translation.startVerify.id)}
        onPress={onPressVerifyPhoneNumber}
        disabled={phoneNumber.hasErrors}
      />
    </View>
  );

  const RenderOtpVerification = (
    <View style={Style.windowContainer}>
      <ModalHeader
        title={i18n.t(translation.verifyAccount.id)}
        onPressArrow={backToPhoneVerification}
      />
      <Text style={Style.textSubTitleOtp}>
        <I18n {...translation.enterOTP} />
      </Text>
      {flatListIndex === 1 && (
        <OTPInputView
          autoFocusOnLoad={false}
          pinCount={4}
          code={otp.value}
          style={Style.otpContainerStyle}
          onCodeChanged={onChangeHandler(otp.changeModel)}
          codeInputFieldStyle={Style.otpInputFieldStyle}
          clearInputs={isEmpty(otp.value)}
        />
      )}
      <View style={Style.countDownContainer}>
        <Text style={Style.textSubTitleOtp}>
          {i18n.t(translation.expireIn.id, {})}
        </Text>
        {flatListIndex === 1 && (
          <CountDown
            until={300}
            timeToShow={['M', 'S']}
            timeLabels={({ m: null }, { s: null })}
            digitStyle={Style.countDownBackground}
            separatorStyle={Style.countDownSeparator}
            showSeparator
            onFinish={backToPhoneVerification}
          />
        )}
      </View>
      <IconButton
        color={buttonOtpDisabledHandler()}
        title={i18n.t(translation.startVerify.id)}
        disabled={!getButtonOtpState()}
        onPress={onPressVerifyOtp}
      />
    </View>
  );

  const inputErrors = (value) => {
    const hasErrors = value.dirty && value.hasErrors;
    if (hasErrors) {
      return <Text style={Style.textError}>{value.errors[0]}</Text>;
    }
    return null;
  };
  const RenderChangePassword = (
    <View style={Style.windowContainer}>
      <ModalHeader
        title={i18n.t(translation.createNewPassword.id)}
        onPressArrow={backToOtpVerification}
      />
      <Text style={Style.textSubTitle}>
        <I18n {...translation.pleaseDonotSharePassword} />
      </Text>
      <View style={Style.changePasswordContainer}>
        <InputCustom
          customValue={newPasswordValue}
          placeholder={i18n.t(translation.password.id)}
          secure={true}
          rightActionName={i18n.t(translation.show.id)}
          onChangeText={onChangePasswordHandler}
          customStyle={Style.inputContainer}
          inputErrors={inputErrors}
        />
        <View style={Style.borderBottom} />
        <InputCustom
          customValue={newPasswordValueVerify}
          placeholder={i18n.t(translation.confirmPassword.id)}
          secure={true}
          onChangeText={onChangeHandler(newPasswordValueVerify.changeModel)}
          rightActionName={i18n.t(translation.show.id)}
          inputErrors={inputErrors}
          customStyle={Style.inputContainer}
        />
      </View>
      <IconButton
        color={buttonPasswordMatchVerificationDisabledHandler()}
        title={i18n.t(translation.startVerify.id)}
        onPress={onPressVerifyPassword}
        disabled={!getButtonPasswordMatchVerificationState()}
      />
    </View>
  );
  const data = isResetPassword
    ? [RenderPhoneVerification, RenderOtpVerification, RenderChangePassword]
    : [RenderPhoneVerification, RenderOtpVerification];

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Style.modalContainer}>
          <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            scrollEnabled={false}
            data={data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => item}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            keyboardShouldPersistTaps="always"
            windowSize={10}
            onScrollToIndexFailed={(info) => {
              const intervalId = (resolve) => setTimeout(resolve, 500);
              const wait = new Promise((resolve) => intervalId(resolve));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
                clearTimeout(intervalId);
              });
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default PhoneVerification;
