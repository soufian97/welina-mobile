import React, { useCallback } from 'react';
import { Keyboard, Text, View, TouchableWithoutFeedback } from 'react-native';
import ModalHeader from '../ModalHeader';
import IconButton from '../Buttons/IconButton';
import i18n from '../../config/i18n';
import I18n from '../I18n';
import { translation } from '../../containers/UpdateSurferInfo/message';
import { Style } from './style';
import { colors } from '../../utils/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { isEmpty } from 'lodash';
import CountDown from 'react-native-countdown-component';

const OtpVerification = ({
  otpValue,
  onPressArrowHandler,
  onPressVerifyOtp,
  onChangeOtpText,
}) => {
  const getButtonOtpState = useCallback(() => otpValue.value.length === 4, [
    otpValue.value.length,
  ]);
  const buttonOtpDisabledHandler = () =>
    getButtonOtpState()
      ? [colors.PRIMARY_DARK, colors.PRIMARY]
      : [colors.GRAY, colors.GRAY];

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Style.modalContainer}>
          <View style={Style.windowContainer}>
            <ModalHeader
              title={i18n.t(translation.verifyAccount.id)}
              onPressArrow={onPressArrowHandler}
            />
            <Text style={Style.textSubTitleOtp}>
              <I18n {...translation.enterOTP} />
            </Text>
            <OTPInputView
              autoFocusOnLoad={false}
              pinCount={4}
              code={otpValue.value}
              style={Style.otpContainerStyle}
              onCodeChanged={onChangeOtpText}
              codeInputFieldStyle={Style.otpInputFieldStyle}
              clearInputs={isEmpty(otpValue.value)}
            />
            <View style={Style.countDownContainer}>
              <Text style={Style.textSubTitleOtp}>
                {i18n.t(translation.expireIn.id, {})}
              </Text>
              <CountDown
                until={300}
                timeToShow={['M', 'S']}
                timeLabels={({ m: null }, { s: null })}
                digitStyle={Style.countDownBackground}
                separatorStyle={Style.countDownSeparator}
                showSeparator
                onFinish={onPressArrowHandler}
              />
            </View>
            <IconButton
              color={buttonOtpDisabledHandler()}
              title={i18n.t(translation.startVerify.id)}
              disabled={!getButtonOtpState()}
              onPress={onPressVerifyOtp}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default OtpVerification;
