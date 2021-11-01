import { TouchableOpacity, View } from 'react-native';
import { Style } from './style';
import Menu, { MenuItem } from 'react-native-material-menu';
import { OptionsIcon } from '../../assets/svgs';
import I18n from '../I18n';
import { translation } from './messages';
import React from 'react';

const MenuOptions = ({
  refMenu,
  showMenu,
  updateOfferMenu,
  deleteOfferMenu,
}) => {
  return (
    <View style={Style.menuContainer}>
      <Menu
        ref={refMenu}
        button={
          <TouchableOpacity onPress={showMenu} style={Style.menuIcon}>
            <OptionsIcon />
          </TouchableOpacity>
        }
      >
        <MenuItem onPress={updateOfferMenu}>
          <I18n {...translation.editOffer} />
        </MenuItem>
        <MenuItem onPress={deleteOfferMenu}>
          <I18n {...translation.deleteOffer} />
        </MenuItem>
      </Menu>
    </View>
  );
};

export default MenuOptions;
