import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Style } from './style';
import { colors } from '../../../../utils/colors';

const NextButton = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.PRIMARY_DARK, colors.PRIMARY]}
        style={Style.contentContainer}
      >
        <Text style={Style.textTitle}>{title}</Text>
        {icon}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default NextButton;
