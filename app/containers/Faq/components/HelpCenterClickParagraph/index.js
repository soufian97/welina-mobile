import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { translation } from '../../messages';
import i18n from '../../../../config/i18n';
import { Style } from '../../style';

const ContactUsHelpCenter = ({
  firstContent = i18n.t(translation.contactUsContent1.id),
  secondContent = i18n.t(translation.contactUsContent2.id),
  onPress,
}) => (
  <Text style={Style.textAnswer}>
    <Text>{firstContent}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={Style.textClickHere}>
        {i18n.t(translation.clickHere.id)}
      </Text>
    </TouchableOpacity>
    <Text>{secondContent}</Text>
  </Text>
);
export default ContactUsHelpCenter;
