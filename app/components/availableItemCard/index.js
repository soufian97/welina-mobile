import React, { forwardRef, useCallback } from 'react';
import {
  Animated,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Style } from './style';
import Button from '../Buttons/Button';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import { routes } from '../../utils/navigation/routes';
import backgroundLoadingImage from '../../assets/images/backgroundAvailable.png';

const { width, height } = Dimensions.get('window');

const AvailableCard = forwardRef(
  (
    { buttonTitle, inputRange, navigation, item, customStyle, onPress },
    ref,
  ) => {
    const buttonSize = {
      width: width / 6,
      height: height * 0.03,
      font: width / 40,
      radius: 10,
    };
    const scaleCardY = ref.current.interpolate({
      inputRange,
      outputRange: [0.87, 1, 0.87],
    });

    const scaleInfoY = ref.current.interpolate({
      inputRange,
      outputRange: [1.1, 1, 1.1],
    });

    const handleMoveToDetails = useCallback(
      () =>
        navigation.push(routes.DETAILS, {
          item,
          buttonTitle,
        }),
      [buttonTitle, item, navigation],
    );

    return (
      <Animated.View style={[Style.card(scaleCardY), customStyle]}>
        <TouchableOpacity onPress={handleMoveToDetails}>
          <ImageBackground
            source={{ uri: item.photo }}
            defaultSource={backgroundLoadingImage}
            style={Style.imageCard}
            resizeMode={'cover'}
          >
            <LinearGradient
              colors={[colors.SECONDARY_FULL_OPACITY, colors.SECONDARY]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              locations={[0.6, 1]}
              style={Style.gradient}
            >
              <Animated.View style={Style.scaleInButton(scaleInfoY)}>
                <Button
                  size={buttonSize}
                  title={buttonTitle}
                  onPress={onPress}
                />
                <Text style={Style.name} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={Style.city} numberOfLines={1}>
                  {`${item.location.city}, ${item.location.country}`}
                </Text>
              </Animated.View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

export default AvailableCard;
