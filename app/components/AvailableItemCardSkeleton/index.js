import React, { forwardRef } from 'react';
import { View, ActivityIndicator, Animated } from 'react-native';
import { colors } from '../../utils/colors';
import { Styles } from './style';

const AvailableItemCardSkeleton = forwardRef(({ inputRange }, ref) => {
  const scaleCardY = ref.current.interpolate({
    inputRange,
    outputRange: [0.78, 1, 0.78],
  });

  return (
    <Animated.View style={Styles.card(scaleCardY)}>
      <View style={Styles.container}>
        <ActivityIndicator color={colors.PRIMARY} size={'large'} />
      </View>
    </Animated.View>
  );
});

export default AvailableItemCardSkeleton;
