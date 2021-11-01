import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Style } from './style';
import {
  BookingsContainerIcon,
  CalendarNotification,
  CoachContainerIcon,
  RatingContainerIcon,
} from '../../../../assets/svgs';
import {
  BOOKING_REQUEST,
  OFFER_BOOK,
  SUBMISSION_ACCEPTED,
  REVIEW,
  SURFER,
  COACH,
} from '../../../../config/app.constant';
import { formatDistanceToNow } from 'date-fns';
import { routes } from '../../../../utils/navigation/routes';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

const Notification = ({ content, createdAt, seen, type, userType }) => {
  const navigation = useNavigation();
  const getNotificationParams = useCallback(
    (type) => {
      switch (type) {
        case OFFER_BOOK:
          return {
            icon: <CalendarNotification />,
            route: userType === SURFER ? routes.BOOKING_LIST : null,
          };
        case BOOKING_REQUEST:
          return {
            icon: <BookingsContainerIcon />,
            route: userType === COACH ? routes.COACH_REQUESTS : null,
          };
        case SUBMISSION_ACCEPTED:
          return {
            icon: <CoachContainerIcon />,
          };
        case REVIEW:
          return {
            icon: <RatingContainerIcon />,
            route:
              userType === COACH ? routes.COACH_PROFILE : routes.SURFER_PROFILE,
            params: userType === COACH ? { selectedTab: 2 } : { reviewTab: 2 },
          };
      }
    },
    [userType],
  );

  const handleNotificationPressed = useCallback(() => {
    const route = getNotificationParams(type)?.route;
    const params = getNotificationParams(type)?.params;
    route && navigation.navigate(route, params);
  }, [getNotificationParams, navigation, type]);

  return (
    <TouchableOpacity
      style={Style.cardContainer}
      onPress={handleNotificationPressed}
    >
      <View style={Style.cardTopContainer}>
        <View style={Style.IconsContainer}>
          <View style={Style.seenIcon(seen)} />
          {getNotificationParams(type)?.icon}
        </View>
        <View style={Style.infoTextContainer}>
          <Text style={Style.textMessage}>{content}</Text>
          <Text style={Style.textTime}>
            {formatDistanceToNow(new Date(createdAt))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;
