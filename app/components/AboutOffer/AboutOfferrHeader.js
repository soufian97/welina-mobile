import React from 'react';
import { View, Text, Image } from 'react-native';
import { Style } from './style';
import { isEmpty } from 'lodash';
import { Star } from '../../assets/svgs';
import { colors } from '../../utils/colors';

const AboutOfferHeader = ({ offerTitle, avatars, starsNumber }) => {
  return (
    <View style={Style.header}>
      <View style={Style.infoContainer}>
        <Text numberOfLines={2} style={Style.name}>
          {offerTitle}
        </Text>
      </View>
      {!isEmpty(avatars) && (
        <View style={Style.ratingContainer}>
          <View style={Style.avatarsContainer}>
            {avatars.slice(0, 3).map((item, index) => {
              return (
                <Image
                  key={index}
                  style={Style.avatar}
                  source={{ uri: item }}
                />
              );
            })}
          </View>
          <View style={Style.ratingPoints}>
            {starsNumber && (
              <>
                <Text style={Style.numberOfStars}>{starsNumber}</Text>
                <Star color={colors.BLACK} />
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
export default AboutOfferHeader;
