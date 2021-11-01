import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Style } from './style';
import { PreviousArrow } from '../../assets/svgs';

const ModalHeader = ({ title, onPressArrow }) => {
  return (
    <View style={Style.headerContainer}>
      <TouchableOpacity onPress={onPressArrow}>
        <View style={Style.icon}>
          <PreviousArrow />
        </View>
      </TouchableOpacity>
      <View style={Style.textHeaderContainer}>
        <Text style={Style.textHeader}>{title}</Text>
      </View>
    </View>
  );
};

export default ModalHeader;
