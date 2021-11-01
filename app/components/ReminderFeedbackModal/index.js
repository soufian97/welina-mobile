import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ContactUsIcon, ShakaIcon } from '../../assets/svgs';
import { translation } from './messages';
import I18n from '../I18n';
import Button from '../Buttons/Button';
import { colors } from '../../utils/colors';
import { Style } from './style';

const { width, height } = Dimensions.get('window');
const buttonSize = {
  width: (width * 0.8) / 2.2,
  height: height * 0.05,
  radius: 10,
};
const ReminderFeedbackModal = ({ agreePressed, disagreePressed }) => {
  return (
    <View style={Style.container}>
      <View style={Style.wrapper}>
        <View style={Style.textIconContainer}>
          <ShakaIcon width={120} height={120} />
          <Text style={Style.textStyle}>
            <I18n {...translation.message} />
          </Text>
          <Text style={Style.textStyle}>
            <I18n {...translation.pressOn} />
          </Text>
        </View>
        <View style={Style.buttonContainer}>
          <Button
            onPress={disagreePressed}
            size={buttonSize}
            color={[colors.SECONDARY, colors.SECONDARY]}
            title={<I18n {...translation.later} />}
          />
          <Button
            onPress={agreePressed}
            size={buttonSize}
            title={<I18n {...translation.doIt} />}
          />
        </View>
      </View>
    </View>
  );
};

export default ReminderFeedbackModal;
