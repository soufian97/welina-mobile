import React, { useCallback, useState } from 'react';
import {
  View,
  Animated,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Style } from './style';

import { MapPin, Star } from '../../../../assets/svgs';
import { colors } from '../../../../utils/colors';
import Button from '../../../../components/Buttons/Button';
import i18n from '../../../../config/i18n';
import { translation } from '../../messages';
import AboutOffer from '../../../../components/AboutOffer';
import AboutInstructor from '../../../../components/AboutInstructor';
import { isEmpty } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const Details = ({
  navigation,
  item,
  currency = 'MAD',
  onCardPressed,
  offerDetails,
  onPressBook,
}) => {
  const buttonSize = {
    width: width / 4,
    height: height * 0.04,
    font: width / 35,
    radius: 10,
  };

  const [showDetails, setShowDetails] = useState(false);
  const [cardHeight, setCardHeight] = useState(height * 0.6);
  const [detailsTranslateAnimation] = useState(new Animated.Value(0));

  const detailsTranslate = detailsTranslateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.35, height * 0.15],
  });

  const renderPrices = () => (
    <Text style={Style.feesText}>
      {` ${item.price} ${item.currency || currency}`}
    </Text>
  );

  const startAnimation = useCallback(() => {
    Animated.spring(detailsTranslateAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [detailsTranslateAnimation]);

  const stopAnimation = useCallback(() => {
    Animated.spring(detailsTranslateAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [detailsTranslateAnimation]);

  const handleCardPressed = useCallback(() => {
    onCardPressed();
    if (showDetails) {
      setCardHeight(height * 0.6);
      stopAnimation();
    } else {
      setCardHeight(height * 0.9);
      startAnimation();
    }
    setShowDetails(!showDetails);
  }, [onCardPressed, showDetails, startAnimation, stopAnimation]);

  const handleShowDetails = () => {
    if (showDetails && !isEmpty(offerDetails)) {
      return (
        <View style={Style.about}>
          <AboutOffer
            offer={offerDetails}
            offerType={item.type}
            showHeader={false}
          />
          <AboutInstructor
            offer={offerDetails}
            navigation={navigation}
            showFooter={false}
            item={item}
          />
        </View>
      );
    }
    return null;
  };

  const handleFees = () => {
    return item.price ? (
      <View style={Style.sessionFees}>
        <Text style={Style.price}>{`${item.currency || currency} ${
          item.price
        } /`}</Text>
        <Text style={Style.duration}>{i18n.t(translation.session.id)}</Text>
      </View>
    ) : (
      <View>{renderPrices()}</View>
    );
  };

  const getRating = (numberOfStars = item.coachScore) => {
    return numberOfStars ? (
      <View style={Style.ratingContainer}>
        <View style={Style.avatarsContainer}>
          {item.reviewersPhoto &&
            item.reviewersPhoto.slice(0, 3).map((item, index) => {
              return (
                <Image
                  key={index}
                  style={Style.avatar}
                  source={{
                    uri: item,
                  }}
                />
              );
            })}
        </View>
        <View style={Style.ratingPoints}>
          <Text style={Style.numberOfStars}>
            {numberOfStars && numberOfStars % 1 === 0
              ? numberOfStars
              : numberOfStars.toFixed(1)}
          </Text>
          <Star color={colors.BLACK} />
        </View>
      </View>
    ) : null;
  };

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      style={Style.detailsContainer(cardHeight, detailsTranslate)}
    >
      <TouchableOpacity onPress={handleCardPressed}>
        <ImageBackground
          source={{ uri: item.photo }}
          style={Style.image}
          resizeMode={'cover'}
        >
          <LinearGradient
            colors={[colors.SECONDARY_FULL_OPACITY, colors.SECONDARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0.6, 1]}
            style={Style.gradient}
          >
            <View style={Style.mapPin}>
              <MapPin width={17} height={20} color={colors.WHITE} />
              <Text style={Style.locationText}>{item.location.city}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
      <View style={Style.offerHeader}>
        <Text style={Style.offerTitle}>{item.title}</Text>
        {getRating()}
      </View>
      <View style={Style.feesAndBooking}>
        {handleFees()}
        <View>
          <Button
            size={buttonSize}
            title={i18n.t(translation.book.id)}
            onPress={onPressBook}
          />
        </View>
      </View>
      {handleShowDetails()}
    </Animated.ScrollView>
  );
};

export default Details;
