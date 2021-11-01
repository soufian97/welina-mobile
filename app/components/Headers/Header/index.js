import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DiscoverLogo, Combined } from '../../../assets/svgs';
import { Style } from '../style';

const Header = ({ onPress }) => {
  return (
    <View style={Style.container}>
      <DiscoverLogo />
      <TouchableOpacity onPress={onPress}>
        <Combined />
      </TouchableOpacity>
    </View>
  );
};
export default Header;
