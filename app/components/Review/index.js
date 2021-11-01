import React from 'react';
import { View, Text, Image } from 'react-native';
import { Star } from '../../assets/svgs';
import anonymous from '../../assets/images/avatar.png';
import Style from './style';
import { colors } from '../../utils/colors';

const Review = ({ name, avatar, rating, date, review }) => {
  const getAvatarImage = () => (avatar === null ? anonymous : { uri: avatar });
  return (
    <View style={Style.container}>
      <View style={Style.header}>
        <View style={Style.infoContainer}>
          <Image style={Style.image} source={getAvatarImage()} />
          <View style={Style.nameContainer}>
            <Text style={Style.name}>{name}</Text>
            <View style={Style.ratingContainer}>
              <Star color={colors.BLACK} />
              <Text style={Style.rating}>{rating}</Text>
            </View>
          </View>
        </View>
        <Text style={Style.date}>{date}</Text>
      </View>
      <Text style={Style.review}>{review}</Text>
    </View>
  );
};
export default Review;
