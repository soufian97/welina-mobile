import React from 'react';
import { Text, View } from 'react-native';
import { Style } from './style';
import { CheckBox } from '../../assets/svgs';
import i18n from '../../config/i18n';
import { ENGLISH } from '../../config/app.constant';

const AboutOfferFeature = ({ feature }) => {
  return (
    <View style={Style.feature} key={`${feature.id}`}>
      <CheckBox />
      <Text style={Style.txtFeature}>
        {feature && i18n?.language === ENGLISH
          ? feature.labelEn
          : feature.labelFr}
      </Text>
    </View>
  );
};

export default AboutOfferFeature;
