import React, { memo } from 'react';
import { View, Text } from 'react-native';
import Style from './style';
import I18n from '../../../../components/I18n';
import DayPicker from '../../../../components/DayPicker';
import { translation } from '../../messages';
import TimeButton from '../../../RequestSession/Components/TimeButton';

const Dates = ({
  selectedDay,
  selectedTime,
  setSelectedDay,
  setSelectedMonth,
  setSelectedTime,
  timeSlotButtons,
  setMonthsDays,
  monthsDays,
  months,
  selectedMonth,
}) => {
  const renderTimeSlots = () => {
    return (
      timeSlotButtons && (
        <>
          <Text style={Style.title}>
            <I18n {...translation.selectHours} />
          </Text>
          <View style={Style.bottom}>
            <View style={Style.datesLabels}>
              {timeSlotButtons.map((item) => {
                return (
                  <TimeButton
                    key={item.title}
                    item={item}
                    title={item.title}
                    selected={selectedTime.title === item.title}
                    Icon={item.icon}
                    onPress={setSelectedTime}
                  />
                );
              })}
            </View>
          </View>
        </>
      )
    );
  };
  return (
    <>
      <View style={Style.header}>
        <Text style={Style.title}>
          <I18n {...translation.startDay} />
        </Text>
        <View style={Style.headerTitles}>
          <DayPicker
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setSelectedMonth={setSelectedMonth}
            selectedMonth={selectedMonth}
            setMonthsDays={setMonthsDays}
            monthsDays={monthsDays}
            months={months}
          />
        </View>
      </View>
      {renderTimeSlots()}
    </>
  );
};
export default memo(Dates);
