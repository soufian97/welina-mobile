import React from 'react';
import { Pressable, Text, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Style from './style';
import { colors } from '../../../utils/colors';
import { RightArrow } from '../../../assets/svgs';

const { width, height } = Dimensions.get('window');

const IconButton = ({
  color = [colors.PRIMARY_DARK, colors.PRIMARY],
  title,
  icon = <RightArrow />,
  onPress,
  size = {
    radius: 10,
    width: width * 0.9,
    height: height * 0.0665,
    font: 15,
  },
  right = true,
  containerStyle,
  opacity = 0.5,
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
        style={Style.button(size)}
      >
        <Text
          style={
            (Style.textButton(size.font),
            right ? Style.textButton(size.font) : Style.text(size.font))
          }
        >
          {title}
        </Text>
        <View style={right ? Style.rightIcon : Style.leftIcon}>{icon}</View>
      </LinearGradient>
    </Pressable>
  );
};

export default IconButton;
