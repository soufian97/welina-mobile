import React, { useCallback, memo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Style from './style';
import Button from '../Buttons/Button';
import { routes } from '../../utils/navigation/routes';

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import backgroundLoadingImage from '../../assets/images/backgroundRecently.png';

const { width } = Dimensions.get('window');

const CardRecently = ({
  name,
  buttonTitle,
  location,
  navigation,
  item,
  onPressBook,
}) => {
  const buttonSize = {
    width: width / 9,
    height: 16,
    font: width / 65,
    radius: 10,
  };

  const handleMoveToDetails = useCallback(
    () =>
      navigation.push(routes.DETAILS, {
        item,
        buttonTitle,
      }),
    [buttonTitle, item, navigation],
  );

  return (
    <TouchableOpacity onPress={handleMoveToDetails}>
      <ImageBackground
        source={{ uri: item.photo }}
        defaultSource={backgroundLoadingImage}
        style={Style.cardContainer}
      >
        <LinearGradient
          colors={[colors.SECONDARY_FULL_OPACITY, colors.SECONDARY]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.6, 1]}
          style={Style.gradient}
        >
          <View style={Style.infoContainer}>
            <View style={Style.textContainer}>
              <Text style={Style.mainText} numberOfLines={1}>
                {name}
              </Text>
              <Text style={Style.locationText} numberOfLines={1}>
                {`${location.city}, ${location.country}`}
              </Text>
            </View>
            <Button
              size={buttonSize}
              title={buttonTitle}
              onPress={onPressBook}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(CardRecently);
