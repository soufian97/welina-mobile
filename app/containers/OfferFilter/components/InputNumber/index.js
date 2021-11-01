import React, { memo, useCallback } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Style from './style';
import { colors } from '../../../../utils/colors';

const InputNumber = ({
  item: { value = 0, onIncrease, onDecrease, title },
}) => {
  const handleDecrease = useCallback(() => {
    onDecrease(value > 1 ? value - 1 : 0);
  }, [onDecrease, value]);

  const handleIncrease = useCallback(() => {
    onIncrease(value < 10 ? value + 1 : value);
  }, [onIncrease, value]);

  const handleTextChange = (text) => {
    onIncrease(text);
  };
  return (
    <View style={Style.container}>
      <Text style={Style.label}>{title}</Text>

      <View style={Style.inputContainer}>
        <TouchableOpacity style={Style.icons} onPress={handleDecrease}>
          <Text style={Style.iconStyle}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={Style.input}
          keyboardType={'number-pad'}
          value={`${value}`}
          placeholderTextColor={colors.GRAY}
          onChangeText={handleTextChange}
        />
        <TouchableOpacity style={Style.icons} onPress={handleIncrease}>
          <Text style={Style.iconStyle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default memo(InputNumber);
