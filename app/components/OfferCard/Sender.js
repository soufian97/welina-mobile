import { Image, Text, View } from 'react-native';
import { Style } from './style';
import React from 'react';

const Sender = ({ avatar, surfer }) => (
  <View style={Style.senderContainer}>
    <Image style={Style.image} source={avatar} />
    <View style={Style.senderInfo}>
      <Text
        style={Style.senderFullName}
      >{`${surfer.firstName} ${surfer.lastName}`}</Text>
      <Text style={Style.senderType}>{`${surfer.type}`}</Text>
    </View>
  </View>
);

export default Sender;
