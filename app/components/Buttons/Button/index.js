import React from 'react';
import { Pressable, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Style } from './style';
import { colors } from '../../../utils/colors';

const Button = ({
  size,
  title,
  color = [colors.PRIMARY_DARK, colors.PRIMARY],
  textColor = colors.WHITE,
  onPress,
  opacity = 0.5,
  containerStyle,
  ...customProps
}) => {
  return (
    <Pressable
      {...customProps}
      onPress={onPress}
      style={({ pressed }) => [
        pressed && Style.containerOpacity(opacity),
        containerStyle,
      ]}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={color}
        style={Style.btn(size)}
      >
        <Text style={Style.mainText(size.font, textColor)}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;
