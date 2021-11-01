import React, { memo } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import Style from './style';
import { colors } from '../../../../utils/colors';

const SliderContainer = ({
  min = 0,
  max,
  currency,
  value = 0,
  onChange,
  step = 1,
}) => {
  return (
    <View style={Style.container}>
      <View style={Style.headerContainer}>
        <Text style={Style.minMaxFees}>{`${min} ${currency} - ${parseInt(
          value,
          10,
        )} ${currency}`}</Text>
      </View>
      <View style={Style.sliderContainer}>
        <Slider
          style={Style.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          minimumTrackTintColor={colors.PRIMARY}
          maximumTrackTintColor={colors.LIGHT_GRAY_BACKGROUND}
          thumbTintColor={colors.PRIMARY}
          value={value}
          onValueChange={onChange}
        />
      </View>
    </View>
  );
};
export default memo(SliderContainer);
