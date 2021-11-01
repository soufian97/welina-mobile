import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Style } from './style';
import { colors } from '../../../../utils/colors';

const TimeButton = ({
  Icon,
  title,
  selected,
  item,
  onPress,
  ...customProps
}) => {
  const onPressButtonHandler = useCallback(() => onPress(item), [
    item,
    onPress,
  ]);
  return selected ? (
    <TouchableOpacity onPress={onPressButtonHandler} {...customProps}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.PRIMARY_DARK, colors.PRIMARY]}
        style={Style.contentContainer}
      >
        <Icon color={colors.WHITE} />
        <Text style={Style.textTitle(selected)}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPressButtonHandler}
      style={Style.buttonBorder}
      {...customProps}
    >
      <Icon color={colors.GRAY_DARK} />
      <Text style={Style.textTitle(selected)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TimeButton;
