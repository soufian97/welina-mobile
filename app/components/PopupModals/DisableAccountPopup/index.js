import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Style } from '../style';
import { translation } from '../messages';
import I18n from '../../I18n';
import { colors } from '../../../utils/colors';
import sad from '../../../assets/images/sad.png';
import happy from '../../../assets/images/happy.png';
import i18n from '../../../config/i18n';
import Button from '../../Buttons/Button';

const { width, height } = Dimensions.get('window');
export const DisableAccountPopup = ({
  agreePressed,
  disagreePressed,
  currentUser,
  status,
  witBackground = false,
}) => {
  const getPopupImage = () => {
    let popupImage = status ? sad : happy;
    return <Image source={popupImage} style={Style.image} />;
  };

  const handlePopupText = () => {
    if (currentUser) {
      return status ? (
        <I18n {...translation.disableMessage} />
      ) : (
        i18n.t(translation.welcomeAgain.id, { name: currentUser.firstName })
      );
    }
    return <I18n {...translation.notConnected} />;
  };

  const getPopupButtonWhenUserConnected = () => {
    return status ? (
      <>
        <Button
          size={{
            radius: height / 40,
            width: width * 0.3,
            height: height / 20,
            font: width / 23,
          }}
          color={[colors.PRIMARY_DARK, colors.PRIMARY]}
          title={i18n.t(translation.disagree.id)}
          onPress={disagreePressed}
        />
        <Button
          size={{
            radius: height / 40,
            width: width * 0.3,
            height: height / 20,
            font: width / 23,
          }}
          color={[colors.SECONDARY, colors.SECONDARY_LIGHT]}
          title={i18n.t(translation.agree.id)}
          onPress={agreePressed}
        />
      </>
    ) : (
      <Button
        size={{
          radius: height / 36,
          width: width * 0.6,
          height: height / 18,
          font: width / 23,
        }}
        color={[colors.PRIMARY_DARK, colors.PRIMARY]}
        title={i18n.t(translation.goDashboard.id)}
        onPress={agreePressed}
      />
    );
  };
  const handlePopupButtons = () => {
    return currentUser ? (
      getPopupButtonWhenUserConnected()
    ) : (
      <Button
        size={{
          radius: height / 40,
          width: width * 0.3,
          height: height / 20,
          font: width / 23,
        }}
        color={[colors.SECONDARY, colors.SECONDARY_LIGHT]}
        title={i18n.t(translation.agreeNotConnected.id)}
        onPress={disagreePressed}
      />
    );
  };

  return (
    <View style={Style.container(witBackground)}>
      <View style={Style.modalDisable}>
        <View style={Style.imageContainer}>{getPopupImage()}</View>
        <View style={Style.modalDisableTextView}>
          <Text style={Style.modalText}>{handlePopupText()}</Text>
        </View>
        <View style={Style.modalDisableButtonContainer}>
          {handlePopupButtons()}
        </View>
      </View>
    </View>
  );
};

export default DisableAccountPopup;
