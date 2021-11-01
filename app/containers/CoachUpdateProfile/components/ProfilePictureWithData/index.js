import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Style } from '../../style';

const ProfilePictureWithData = ({ data, removeProfileImageHandler }) => (
  <View style={Style.blurredProfile}>
    <TouchableOpacity
      style={Style.removeImageContainer}
      onPress={removeProfileImageHandler}
    >
      <Text style={Style.removeImageIcon}>X</Text>
    </TouchableOpacity>
    <Image source={{ uri: data }} style={Style.blurredProfile} />
  </View>
);

export default ProfilePictureWithData;
