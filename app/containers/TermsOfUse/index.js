import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Style } from './style';
import backgroundImage from '../../assets/images/splashBackground.webp';
import { ArrowLeft } from '../../assets/svgs';
import { colors } from '../../utils/colors';
import TermsOfUseContents from './components/TermsOfUseContents';

const TermsOfUse = ({ navigation }) => {
  return (
    <ImageBackground style={Style.imageContainer} source={backgroundImage}>
      <View style={Style.viewContainer}>
        <TouchableOpacity
          style={Style.arrowLeftStyle}
          onPress={navigation.goBack}
        >
          <ArrowLeft color={colors.WHITE} />
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Style.scrollContent}
        >
          <TermsOfUseContents />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default TermsOfUse;
