import { ImageBackground, View } from 'react-native';
import blurredProfile from '../../../../assets/images/BluredPlaceholder.jpg';
import { Style } from '../../style';
import { UploadIcon } from '../../../../assets/svgs';
import React from 'react';

const ProfilePictureNoData = () => (
  <ImageBackground source={blurredProfile} style={Style.blurredProfile}>
    <View style={Style.imageButtonContainer}>
      <UploadIcon />
    </View>
  </ImageBackground>
);

export default ProfilePictureNoData;
