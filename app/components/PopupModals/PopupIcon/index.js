import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Style } from '../style';

export const PopupIcon = ({
  message,
  buttonTitle,
  confirmPressed,
  icon,
  withBackground = false,
}) => {
  return (
    <View style={Style.popupContainer}>
      <View style={Style.modalIcon}>
        <View style={Style.iconContainer}>{icon}</View>
        <View style={Style.modalTextView}>
          <Text style={Style.modalText}>{message}</Text>
        </View>
        <View style={Style.modalButtonContainer}>
          <TouchableOpacity
            style={Style.buttonContainer}
            onPress={confirmPressed}
          >
            <Text style={Style.buttonText}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PopupIcon;
