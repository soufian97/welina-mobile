import React from 'react';
import { Text, Pressable } from 'react-native';
import { Style } from './style';
import { SelectedCheckbox, UnselectedCheckbox } from '../../assets/svgs';

const CheckBox = ({
  onPress,
  label,
  isSelected,
  customStyle,
  opacity = 0.5,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && Style.containerOpacity(opacity),
        Style.checkBoxContainer,
        customStyle,
      ]}
      onPress={onPress}
    >
      {isSelected ? <SelectedCheckbox /> : <UnselectedCheckbox />}
      <Text style={Style.textLabel}>{label}</Text>
    </Pressable>
  );
};

export default CheckBox;
