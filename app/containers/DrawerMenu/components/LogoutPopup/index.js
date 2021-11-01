import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Style } from './style';
import { translation } from '../../messages';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../../utils/colors';
import i18n from '../../../../config/i18n';

export const LogoutPopup = ({
  agreePressed,
  disagreePressed,
  textDisagree = i18n.t(translation.cancel.id),
  textAgree = i18n.t(translation.confirm.id),
  question = i18n.t(translation.logoutQuestion.id),
  questionDetails = i18n.t(translation.logoutContent.id),
  withBackground = true,
}) => {
  const handlePopupButtons = () => (
    <>
      <TouchableOpacity style={Style.buttonContainer} onPress={disagreePressed}>
        <Text style={Style.buttonCancelText}>{textDisagree}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={agreePressed}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={[colors.PRIMARY_DARK, colors.PRIMARY]}
          style={Style.buttonContainer}
        >
          <Text style={Style.buttonText}>{textAgree}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={Style.container(withBackground)}>
      <View style={Style.modal}>
        <View style={Style.titleContainer}>
          <Text style={Style.modalTitle}>{question}</Text>
        </View>
        <View style={Style.modalTextView}>
          <Text style={Style.modalText}>{questionDetails}</Text>
        </View>
        <View style={Style.modalbuttonContainer}>{handlePopupButtons()}</View>
      </View>
    </View>
  );
};

export default LogoutPopup;
