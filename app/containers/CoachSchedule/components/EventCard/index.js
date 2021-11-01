import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ALL_DAY, AFTERNOON, MORNING } from '../../../../config/app.constant';
import { colors } from '../../../../utils/colors';
import i18n from '../../../../config/i18n';
import { translation } from '../../messages';
import { Style } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EventCard = ({ surfer, city, timeOfDay, id, handleEventPressed }) => {
  const COLORS = {
    [ALL_DAY]: [colors.PRIMARY, colors.PRIMARY_DARK],
    [MORNING]: [colors.MORNING_BLUE, colors.MORNING_BLUE_DARK],
    [AFTERNOON]: [colors.AFTERNOON_DARK, colors.AFTERNOON],
  };

  const TIME_SLOT = {
    [ALL_DAY]: i18n.t(translation.allDay.id),
    [MORNING]: i18n.t(translation.morning.id),
    [AFTERNOON]: i18n.t(translation.afternoon.id),
  };

  const handleReservationPressed = () => {
    handleEventPressed(id);
  };

  return (
    <TouchableOpacity onPress={handleReservationPressed}>
      <LinearGradient
        style={[Style.eventCardContainer(timeOfDay === ALL_DAY)]}
        colors={COLORS[timeOfDay]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <Text
          style={[
            Style.textEventTitle,
            timeOfDay === AFTERNOON && Style.blackTextColor,
          ]}
        >
          {i18n.t(translation.sessionWith.id, { surfer })}
        </Text>
        <Text
          style={[
            Style.textEventTimeOfDay,
            timeOfDay === AFTERNOON && Style.blackTextColor,
          ]}
        >
          {TIME_SLOT[timeOfDay]}
        </Text>
        <Text
          style={[
            Style.textEventTimeOfDay,
            timeOfDay === AFTERNOON && Style.blackTextColor,
          ]}
        >
          {i18n.t(translation.spot.id, { city })}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default EventCard;
