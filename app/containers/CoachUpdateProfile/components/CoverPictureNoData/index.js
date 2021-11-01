import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../../utils/colors';
import { Style } from '../../style';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftGradientIcon, UploadIcon } from '../../../../assets/svgs';

const CoverPictureNoData = ({ handleGoBack, uploadCoverImageHandler }) => (
  <LinearGradient
    colors={[colors.PRIMARY_DARK_OPACITY, colors.PRIMARY_LOW_OPACITY]}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 1 }}
    locations={[0.6, 1]}
    style={Style.coverContainer}
  >
    <TouchableOpacity style={Style.imageButtonContainer} onPress={handleGoBack}>
      <ArrowLeftGradientIcon />
    </TouchableOpacity>
    <TouchableOpacity
      style={Style.imageButtonContainer}
      onPress={uploadCoverImageHandler}
    >
      <UploadIcon />
    </TouchableOpacity>
  </LinearGradient>
);

export default CoverPictureNoData;
