import { Dimensions, Text, View } from 'react-native';
import { Style } from './style';
import i18n from '../../config/i18n';
import { translation } from './messages';
import Button from '../Buttons/Button';
import React from 'react';
const { width, height } = Dimensions.get('window');

const buttonSize = {
  width: width * 0.3,
  height: height * 0.04,
  font: 16,
  radius: 33,
  margin: 0,
};
const AboutInstructorFooter = ({ onPressBook, currency, price, readOnly }) => {
  return (
    <View style={Style.bookingContainer}>
      <View style={Style.priceContainer}>
        <Text style={Style.price}>{`${currency} ${price} /`}</Text>
        <Text style={Style.duration}>
          {price
            ? i18n.t(translation.session.id)
            : i18n.t(translation.package.id)}
        </Text>
      </View>
      {!readOnly && (
        <Button
          title={i18n.t(translation.book.id)}
          size={buttonSize}
          onPress={onPressBook}
        />
      )}
    </View>
  );
};
export default AboutInstructorFooter;
