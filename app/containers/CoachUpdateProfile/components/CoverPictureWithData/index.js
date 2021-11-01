import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { Style } from '../../style';
import { ArrowLeftGradientIcon } from '../../../../assets/svgs';

const CoverPictureWithData = ({
  data,
  uploadCoverImageHandler,
  removeCoverImageHandler,
  handleGoBack,
}) => (
  <TouchableOpacity onPress={uploadCoverImageHandler}>
    <TouchableOpacity
      style={Style.removeCoverImageContainer}
      onPress={removeCoverImageHandler}
    >
      <Text style={Style.removeImageIcon}>X</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={Style.goBackButtonContainer}
      onPress={handleGoBack}
    >
      <ArrowLeftGradientIcon />
    </TouchableOpacity>
    <Image source={{ uri: data }} style={Style.coverContainer} />
  </TouchableOpacity>
);

export default CoverPictureWithData;
