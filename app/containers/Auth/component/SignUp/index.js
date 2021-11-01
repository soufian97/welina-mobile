import React, { useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Style } from './style';
import backgroundImage from '../../../../assets/images/splashBackground.webp';
import { LogoLetter, RightArrow, ArrowLeft } from '../../../../assets/svgs';
import IconButton from '../../../../components/Buttons/IconButton';
import i18n from '../../../../config/i18n';
import I18n from '../../../../components/I18n';
import { translation } from '../../messages';
import InputCustom from '../../../../components/Inputs/InputCustom';
import { colors } from '../../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../../utils/navigation/routes';

const SignUp = ({
  onSignInPress,
  onPressCreateAccount,
  onChangeText,
  firstName,
  lastName,
  email,
  password,
  inputErrors,
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  const navigation = useNavigation();

  const tab = (backgroundColor, txtColor, item) => {
    return (
      <View style={Style.tab(backgroundColor)}>
        <Text style={Style.textTab(txtColor)}>{item.title}</Text>
      </View>
    );
  };

  const handleTab = (item) =>
    item === tabs[selectedTab]
      ? tab(colors.BLUE_HIGH_OPACITY, colors.BLUE, item)
      : tab(colors.WHITE, colors.BLUE_TEXT, item);

  const handlePress = (index) => () => {
    if (index === selectedTab) {
      setSelectedTab(-1);
    } else {
      setSelectedTab(index);
    }
  };

  const onPressTermsOfUse = useCallback(() => {
    navigation.navigate(routes.TERMS_OF_USE);
  }, [navigation]);

  return (
    <ImageBackground style={Style.imageContainer} source={backgroundImage}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                    <I18n {...translation.register} />
                  </Text>
                  <Text style={Style.textRegularTitle}>
                    <I18n {...translation.registerSubText} />
                  </Text>
                </View>
                <View style={Style.formContainer}>
                  <View style={Style.infoContainer}>
                    <View style={Style.tabBar}>
                      {tabs.map((_, index) => {
                        return (
                          <TouchableOpacity
                            key={`${index}`}
                            onPress={handlePress(index)}
                          >
                            {handleTab(tabs[index])}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <View style={Style.borderBottom} />
                    <InputCustom
                      placeholder={i18n.t(translation.firstName.id)}
                      customValue={firstName}
                      onChangeText={onChangeText(firstName.changeModel)}
                      borderBottom={true}
                      inputErrors={inputErrors}
                      customStyle={Style.customInputStyle}
                    />
                    <View style={Style.borderBottom} />
                    <InputCustom
                      placeholder={i18n.t(translation.lastName.id)}
                      customValue={lastName}
                      onChangeText={onChangeText(lastName.changeModel)}
                      borderBottom={true}
                      inputErrors={inputErrors}
                      customStyle={Style.customInputStyle}
                    />
                    <View style={Style.borderBottom} />
                    <InputCustom
                      placeholder={i18n.t(translation.email.id)}
                      customValue={email}
                      onChangeText={onChangeText(email.changeModel)}
                      borderBottom={true}
                      inputErrors={inputErrors}
                      keyboardType={'email-address'}
                      customStyle={Style.customInputStyle}
                    />
                    <View style={Style.borderBottom} />
                    <InputCustom
                      placeholder={i18n.t(translation.password.id)}
                      customValue={password}
                      onChangeText={onChangeText(password.changeModel)}
                      rightActionName={i18n.t(translation.show.id)}
                      secure={true}
                      customStyle={Style.customInputStyle}
                      inputErrors={inputErrors}
                    />
                  </View>
                </View>
                <View style={Style.bottomContainer}>
                  <View style={Style.bottomTextContainer}>
                    <Text style={Style.textBottom(false)}>
                      <I18n {...translation.byCreatingYourAccount} />
                    </Text>
                    <TouchableOpacity onPress={onPressTermsOfUse}>
                      <Text style={Style.textBottom(true)}>
                        <I18n {...translation.termsOfUse} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <IconButton
                    icon={<RightArrow />}
                    title={i18n.t(translation.createAccount.id)}
                    right
                    onPress={onPressCreateAccount}
                    containerStyle={Style.IconButtonStyle}
                  />
                  <View style={Style.bottomTextContainer}>
                    <Text style={Style.textBottom(false)}>
                      <I18n {...translation.haveAccount} />
                    </Text>
                    <TouchableOpacity onPress={onSignInPress}>
                      <Text style={Style.textBottom(true)}>
                        <I18n {...translation.signIn} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;
