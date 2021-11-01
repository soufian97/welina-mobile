import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Style } from './style';
import { colors } from '../../../utils/colors';

export const Day = ({ state, date, onPress, marking }) => {
  const {
    disableTouchEvent,
    selected,
    inRange,
    startingDay,
    endingDay,
  } = marking;

  const onPressDayHandler = useCallback(() => onPress(date), [date, onPress]);

  const availableDay = (
    <View style={Style.dayComponent}>
      {disableTouchEvent && <View style={Style.offDay} />}
      <Text
        style={[
          Style.textDay(state, disableTouchEvent),
          inRange && { color: colors.PRIMARY_DARK },
        ]}
      >
        {date.day}
      </Text>
    </View>
  );
  const selectedDay = (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.PRIMARY_DARK, colors.PRIMARY]}
      style={Style.dayComponent}
    >
      <Text style={Style.textDaySelected}>{date.day}</Text>
    </LinearGradient>
  );

  return (
    <TouchableOpacity
      disabled={disableTouchEvent}
      onPress={onPressDayHandler}
      style={[
        inRange && Style.dayContainer,
        selected && startingDay && Style.startingDay,
        selected && endingDay && Style.endingDay,
      ]}
    >
      {selected ? selectedDay : availableDay}
    </TouchableOpacity>
  );
};

export default memo(Day);
