import React, { useCallback } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ArrowLeft, Combined } from '../../../assets/svgs';
import { Style } from '../style';
import { useNavigation } from '@react-navigation/native';

const GoBackHeader = ({ headerTitle, leftButtonAction }) => {
  const navigation = useNavigation();

  const handleLeftButtonPress = useCallback(() => {
    leftButtonAction ? leftButtonAction() : navigation.goBack();
  }, [leftButtonAction, navigation]);

  return (
    <View style={Style.goBackContainer}>
      <TouchableOpacity onPress={handleLeftButtonPress} style={Style.icon}>
        <ArrowLeft />
      </TouchableOpacity>
      <Text style={Style.headerTitle}>{headerTitle}</Text>
      <TouchableOpacity onPress={navigation.openDrawer} style={Style.icon}>
        <Combined />
      </TouchableOpacity>
    </View>
  );
};
export default GoBackHeader;
