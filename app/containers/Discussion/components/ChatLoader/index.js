import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Style } from './style';

export const ChatLoader = () => {
  return (
    <View style={Style.container}>
      <SkeletonPlaceholder speed={1800}>
        {Array(20)
          .fill((index) => index)
          .map((item) => (
            <View style={Style.item(Math.random() * 180)} key={`${item}`} />
          ))}
      </SkeletonPlaceholder>
    </View>
  );
};
