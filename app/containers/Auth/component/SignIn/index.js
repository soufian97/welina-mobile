import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Style } from './style';
import backgroundImage from '../../../../assets/images/splashBackground.webp';
import { LogoLetter, ArrowLeft } from '../../../../assets/svgs';
import IconButton from '../../../../components/Buttons/IconButton';
import i18n from '../../../../config/i18n';
import I18n from '../../../../components/I18n';
import { translation } from '../../messages';
import InputCustom from '../../../../components/Inputs/InputCustom';
import CountryPicker from 'react-native-country-picker-modal';
import { colors } from '../../../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const SignIn = ({
  onSignUpPress,
  onPressSignIn,
  onPressForgotPassword,
  onCloseCountryPicker,
  onOpenCountryPicker,
  onSelectHandler,
  signInUsername,
  signInPassword,
  onChangeText,
  inputErrors,
  countryVisibility,
  countryCode,
  countryCallCode,
}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground style={Style.imageContainer} source={backgroundImage}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Style.viewContainer}>
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={Style.keyboardAvoidContainer}
            keyboardShouldPersistTaps="always"
          >
            <View style={Style.screenContainer}>
              <View style={Style.logoContainer}>
                <TouchableOpacity
                  style={Style.arrowLeftStyle}
                  onPress={navigation.goBack}
                >
                  <ArrowLeft color={colors.WHITE} />
                </TouchableOpacity>
                <View style={Style.logoLetterContainer}>
                  <LogoLetter />
                </View>
              </View>
              <View style={Style.textContainer}>
                <Text style={Style.textBoldTitle}>
                  <I18n {...translation.signIn} />
                </Text>
                <Text style={Style.textRegularTitle}>
                  <I18n {...translation.signInText} />
                </Text>
              </View>
              <View style={Style.formContainer}>
                <View style={Style.infoContainer}>
                  <View style={Style.phoneInputContainer}>
                    <View style={Style.phoneWithFlag}>
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
                      <View style={Style.textInputStyle}>
                        <TextInput
                          keyboardType="numeric"
                          placeholder={i18n.t(translation.phone.id)}
                          placeholderTextColor={colors.GRAY}
                          style={Style.textStyle}
                          value={signInUsername.value}
                          onChangeText={onChangeText(
                            signInUsername.changeModel,
                          )}
                        />
                      </View>
                    </View>
                    {inputErrors(signInUsername)}
                  </View>
                  <InputCustom
                    placeholder={i18n.t(translation.password.id)}
                    customValue={signInPassword}
                    rightActionName={i18n.t(translation.forgot.id)}
                    secure={true}
                    onChangeText={onChangeText(signInPassword.changeModel)}
                    inputErrors={inputErrors}
                    borderBottom={true}
                    customStyle={Style.password}
                  />
                </View>
                <IconButton
                  title={i18n.t(translation.signIn.id)}
                  right
                  onPress={onPressSignIn}
                />
                <TouchableOpacity onPress={onPressForgotPassword}>
                  <Text style={Style.textForgotPassword}>
                    <I18n {...translation.forgotPassword} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={Style.bottomContainer}>
                <Text style={Style.textBottom(false)}>
                  <I18n {...translation.noAccount} />
                </Text>
                <TouchableOpacity onPress={onSignUpPress}>
                  <Text style={Style.textBottom(true)}>
                    <I18n {...translation.createOne} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default SignIn;
