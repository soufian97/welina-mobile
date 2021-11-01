import React, { useCallback } from 'react';
import { Image, View, Text, Animated, Dimensions } from 'react-native';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import avatar from '../../../../assets/images/avatar.png';
import { Style } from './style';
import { TrashIcon } from '../../../../assets/svgs';
import { TwilioService } from '../../../../utils/twilio-service';
import { COACH } from '../../../../config/app.constant';
import { formatDistance } from 'date-fns';
const { width } = Dimensions.get('screen');

const MessageItem = ({ handleDelete, item, currentUser, handleClick }) => {
  const newChannel = TwilioService.getInstance().parseChannel(item);

  const leftSwipe = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, width / 3],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <View style={Style.deleteBox}>
          <Animated.View style={{ transform: [{ scale: scale }] }}>
            <TrashIcon />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  const getContactFullName = useCallback(() => {
    let itemNumber = 1;
    if (currentUser.type === COACH) {
      itemNumber = 0;
    }

    return newChannel.name
      ?.split('-')
      [itemNumber].split('.')
      .join(' ')
      .split('*')
      .join(' ');
  }, [currentUser.type, newChannel.name]);

  const getFormattedDateOfLastMessage = useCallback(
    () =>
      newChannel.lastMessageTime &&
      formatDistance(newChannel.lastMessageTime, new Date(), {
        addSuffix: true,
      }),
    [newChannel.lastMessageTime],
  );

  return (
    newChannel && (
      <Swipeable renderLeftActions={leftSwipe}>
        <TouchableOpacity style={Style.container} activeOpacity={0.6}>
          <View style={Style.avatarContainer}>
            <Image source={avatar} style={Style.avatarImage} />
          </View>
          <View style={Style.messageInfoContainer}>
            <View style={Style.messageInfoTopContainer}>
              <Text style={Style.contactName}>{getContactFullName()}</Text>
            </View>
            <View style={Style.messageInfoBottomContainer}>
              <Text style={Style.contactMessage} numberOfLines={1}>
                {newChannel.lastMessage?.text}
              </Text>
              <Text style={Style.contactLastTime}>
                {getFormattedDateOfLastMessage()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  );
};

export default MessageItem;
