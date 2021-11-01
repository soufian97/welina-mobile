import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../utils/colors';
import { Style } from './style';

const FullScreenLoader = ({ visible }) => {
  return visible ? (
    <View style={Style.container}>
      <View style={Style.activityContainer}>
        <ActivityIndicator color={colors.PRIMARY_DARK} size={35} />
      </View>
    </View>
  ) : null;
};

export default FullScreenLoader;
