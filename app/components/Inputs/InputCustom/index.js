import React, { useCallback, useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { Style } from '../style';
import { colors } from '../../../utils/colors';
import { Hide, Eye } from '../../../assets/svgs';

const InputCustom = ({
  placeholder,
  inputErrors,
  rightActionName,
  customValue,
  onChangeText,
  secure,
  borderBottom,
  customStyle,
  rightActionMainHandler,
  title,
  editable = true,
  keyboardType = 'default',
  ...customTextInputProp
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeTextHandler = useCallback(
    (text) => {
      customValue.changeModel(text);
      onChangeText && onChangeText(text);
    },
    [customValue, onChangeText],
  );
  const rightActionHandler = useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);
  return (
    <View style={[Style.inputCustomContainer, customStyle]}>
      <View style={Style.textInputContainer}>
        <TextInput
          style={Style.textCustomInput(editable)}
          onChangeText={onChangeTextHandler}
          value={customValue.value}
          placeholder={placeholder}
          placeholderTextColor={colors.GRAY}
          secureTextEntry={secure && hidePassword}
          editable={editable}
          keyboardType={keyboardType}
          {...customTextInputProp}
        />
        {inputErrors && inputErrors(customValue)}
      </View>
      {rightActionName && (
        <TouchableOpacity
          style={Style.textRightActionContainer}
          onPress={rightActionMainHandler || rightActionHandler}
        >
          {hidePassword ? <Eye /> : <Hide />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputCustom;
