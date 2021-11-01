import React, { memo, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Style } from '../style';
import { MinusIcon, PlusIcon } from '../../../assets/svgs';

const InputNumber = ({
  title,
  width = Dimensions.get('screen').width * 0.25,
  disabled,
  center,
  setStateNumber,
  stateNumber,
  minValue = 0,
  maxValue = Number.MAX_SAFE_INTEGER,
}) => {
  const onPressPlus = useCallback(() => {
    stateNumber < maxValue && setStateNumber(Number(stateNumber) + 1);
  }, [maxValue, setStateNumber, stateNumber]);

  const onPressMinus = useCallback(() => {
    stateNumber > minValue && setStateNumber(Number(stateNumber) - 1);
  }, [minValue, setStateNumber, stateNumber]);

  const onCursorOut = useCallback(() => {
    if (Number(stateNumber) < minValue || Number(stateNumber) > maxValue) {
      setStateNumber(minValue);
    }
  }, [maxValue, minValue, setStateNumber, stateNumber]);

  const handleTextChange = useCallback(
    (text) => {
      setStateNumber(Number(text));
    },
    [setStateNumber],
  );
  return (
    <View style={Style.container}>
      {title && <Text style={Style.label}>{title}</Text>}
      <View style={Style.inputContainer(width, center)}>
        <TouchableOpacity
          style={Style.icons}
          onPress={onPressMinus}
          disabled={disabled}
        >
          <MinusIcon />
        </TouchableOpacity>
        <TextInput
          style={Style.input}
          keyboardType={'number-pad'}
          value={`${stateNumber}`}
          onChangeText={handleTextChange}
          onBlur={onCursorOut}
        />
        <TouchableOpacity
          style={Style.icons}
          onPress={onPressPlus}
          disabled={disabled}
        >
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default memo(InputNumber);
