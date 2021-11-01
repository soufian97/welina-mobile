import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { colors } from '../../utils/colors';
import { getDateFormatter } from '../../utils/date/dateFormater';
import { getMonthsDays } from '../../utils/date/datesRange';
import { Style } from './style';

const DayPicker = ({
  selectedDay,
  selectedMonth,
  setSelectedDay,
  setSelectedMonth,
  setMonthsDays,
  monthsDays,
  months,
  title,
  editable = true,
}) => {
  const handleSelectDay = (item) => () => {
    setSelectedDay(item.number);
  };

  const handleChangeMonth = useCallback((item) => {
    setSelectedMonth(item);
    setMonthsDays(getMonthsDays(item));
    setSelectedDay(getMonthsDays(item)[0].number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardDay = ({ item }) => {
    let isSelected = Number(selectedDay) === Number(item.number);
    return (
      <TouchableOpacity
        disabled={!editable}
        style={Style.cardDay}
        onPress={handleSelectDay(item)}
      >
        {isSelected ? (
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.PRIMARY_DARK, colors.PRIMARY]}
            style={Style.cardDay}
          >
            <Text style={Style.normalText(isSelected)}>{item.label}</Text>
            <Text style={Style.dayNumber(isSelected)}>{item.number}</Text>
          </LinearGradient>
        ) : (
          <>
            <Text style={Style.normalText(isSelected)}>{item.label}</Text>
            <Text style={Style.dayNumber(isSelected)}>{item.number}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={Style.header}>
      <View style={Style.headerTitles}>
        <Text style={Style.title}>{title}</Text>
        <View style={editable && Style.dropDown}>
          {editable ? (
            <Dropdown
              data={months}
              value={selectedMonth}
              mainContainerStyle={Style.dropDownContainer}
              textInputStyle={Style.labelStyle}
              onChange={handleChangeMonth}
              underlineColor={'transparent'}
              disableSort
              disableSelectionTick
            />
          ) : (
            <Text style={Style.textMonthYear}>
              {getDateFormatter(selectedMonth, 'MMMM yyyy')}
            </Text>
          )}
        </View>
      </View>
      <FlatList
        scrollEnabled={editable}
        style={Style.flatListStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={monthsDays}
        keyExtractor={(item) => `${item.number}`}
        renderItem={cardDay}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

export default DayPicker;
