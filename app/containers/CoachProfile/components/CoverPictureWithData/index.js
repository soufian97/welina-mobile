import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { API_URL } from '../../../../utils/http/http';
import { Style } from '../../style';
import { ArrowLeftGradientIcon } from '../../../../assets/svgs';
const localhostLink = 'http://localhost:8080/api/v1';

const CoverPictureWithData = ({ currentUser, handleGoBack }) => (
  <ImageBackground
    source={{
      uri: currentUser?.coverPicture.replace(localhostLink, API_URL),
    }}
    style={Style.coverContainer}
  >
    <TouchableOpacity style={Style.imageButtonContainer} onPress={handleGoBack}>
      <ArrowLeftGradientIcon />
    </TouchableOpacity>
  </ImageBackground>
);

export default CoverPictureWithData;
