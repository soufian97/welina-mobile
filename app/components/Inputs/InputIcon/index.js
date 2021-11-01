import React, { useCallback, useRef } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../../utils/colors';
import { Style } from '../style';

const InputIcon = ({
  title,
  inputErrors,
  customValue,
  placeholder,
  secure,
  editable = true,
  icon,
  customContainerStyle,
  onChangeText,
}) => {
  const textInputRef = useRef(null);
  const onPressEditHandler = useCallback(() => {
    textInputRef.current?.focus();
  }, []);
  return (
    <View style={[Style.inputIconContainer, customContainerStyle]}>
      {title && <Text style={Style.textTitle(editable)}>{title}</Text>}
      <View style={Style.inputRowContainer}>
        <TextInput
          style={Style.textInput(editable)}
          ref={textInputRef}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={customValue.value}
          secureTextEntry={secure}
          editable={editable}
          placeholderTextColor={colors.GRAY}
        />
        <TouchableOpacity style={Style.icon} onPress={onPressEditHandler}>
          {icon}
        </TouchableOpacity>
      </View>
      {inputErrors && inputErrors(customValue)}
    </View>
  );
};

export default InputIcon;
