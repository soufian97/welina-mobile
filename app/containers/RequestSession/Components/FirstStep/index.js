import React, { useState, useCallback, useMemo } from 'react';
import { CalendarList } from 'react-native-calendars';
import { View, Text } from 'react-native';
import I18n from '../../../../components/I18n';
import i18n from '../../../../config/i18n';
import { translation } from '../../messages';
import Day from '../Day';
import { Style, CustomCalendarTheme } from './style';
import TimeButton from '../TimeButton';
import {
  Sun,
  Moon,
  Cloud,
  RightArrowNoBackground,
} from '../../../../assets/svgs';
import NextButton from '../NextButton';
import {
  getAlphabeticDate,
  getCurrentDateFormatter,
  getDateFormatter,
  getDateRangeOfDate,
} from '../../../../utils/date/dateFormater';
import {
  AFTERNOON,
  MORNING,
  SESSION,
  ALL_DAY,
} from '../../../../config/app.constant';
import InputNumber from '../../../../components/Inputs/InputNumber';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../../../utils/colors';
import { addDays, isAfter } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { routes } from '../../../../utils/navigation/routes';

const FirstStep = ({
  availability,
  bookOffer,
  type,
  shouldSelectAtLeastOneAttendee,
  navigation,
  capacity,
  withKids,
}) => {
  const getOfferCurrentDate = () => {
    return getDateFormatter(
      getDateRangeOfDate(
        isAfter(new Date(), new Date(availability.startDate))
          ? getCurrentDateFormatter()
          : availability.startDate,
        isAfter(new Date(), new Date(availability.endDate))
          ? getCurrentDateFormatter()
          : availability.endDate,
        true,
      )[0],
    );
  };

  const getDefaultCurrentCalendarMonth = () =>
    isAfter(new Date(), new Date(availability.startDate))
      ? new Date()
      : new Date(availability.startDate);

  const [selectedDate, setSelectedDate] = useState(
    availability.startDate &&
      getOfferCurrentDate() !== getCurrentDateFormatter()
      ? getOfferCurrentDate()
      : null,
  );

  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfKids, setNumberOfKids] = useState(0);

  const getCalendarDateInRangeValue = useMemo(() => {
    const dateInRange = {};
    getDateRangeOfDate(
      isAfter(new Date(), new Date(availability.startDate))
        ? getCurrentDateFormatter()
        : availability.startDate,
      isAfter(new Date(), new Date(availability.endDate))
        ? getCurrentDateFormatter()
        : availability.endDate,
      true,
    ).forEach((date) => {
      dateInRange[date] = {
        color: colors.BLUE_HIGH_OPACITY,
        isSelectable: true,
      };
    });
    return dateInRange;
  }, [availability.endDate, availability.startDate]);

  const timeSlotButtons = [
    { Icon: Cloud, title: i18n.t(translation.allDay.id), disabled: false },
    { Icon: Sun, title: i18n.t(translation.morning.id), disabled: false },
    { Icon: Moon, title: i18n.t(translation.afternoon.id), disabled: false },
  ];
  const [timeSlot, setTimeSlot] = useState();

  const getSelectedTimeOfDay = (item, index) => {
    return timeSlot ? timeSlot.title === item.title : index === 0;
  };

  const changeDayHandler = useCallback((date) => {
    setSelectedDate(date.dateString);
    setTimeSlot(null);
  }, []);

  const getTextDate = () => `${getAlphabeticDate(selectedDate)}`;

  const getStepTitle = () =>
    type !== SESSION
      ? i18n.t(translation.selectStartDate.id)
      : i18n.t(translation.selectSession.id);

  const handleCapacity = () => {
    return capacity ? (
      <Text> {i18n.t(translation.capacity.id, { size: capacity })}</Text>
    ) : null;
  };

  const kidsItem = {
    id: 2,
    title: i18n.t(translation.numberOfKids.id),
    stateNumber: numberOfKids,
    setStateNumber: setNumberOfKids,
    minValue: 0,
  };

  const personsItems = [
    {
      id: 0,
      title: i18n.t(translation.numberOfAdults.id),
      stateNumber: numberOfAdults,
      setStateNumber: setNumberOfAdults,
      minValue: 0,
    },
    withKids ? kidsItem : null,
  ];

  const getTimeOfDay = useCallback(() => {
    let selectedTimeOfDay = timeSlot
      ? timeSlot.title
      : timeSlotButtons[0].title;
    let timeOfDay = AFTERNOON;
    if (selectedTimeOfDay === timeSlotButtons[0].title) {
      timeOfDay = ALL_DAY;
    } else {
      if (selectedTimeOfDay === timeSlotButtons[1].title) {
        timeOfDay = MORNING;
      }
    }
    return timeOfDay;
  }, [timeSlot, timeSlotButtons]);

  const handleBookOffer = useCallback(() => {
    if (!numberOfAdults && !numberOfKids) {
      shouldSelectAtLeastOneAttendee();
    } else {
      bookOffer({
        reservationDate: getDateFormatter(selectedDate),
        numberOfAdults: numberOfAdults,
        numberOfKids: numberOfKids,
        timeOfDay: getTimeOfDay(),
      });
    }
  }, [
    bookOffer,
    getTimeOfDay,
    numberOfAdults,
    numberOfKids,
    selectedDate,
    shouldSelectAtLeastOneAttendee,
  ]);

  const onPressTermsOfService = useCallback(() => {
    navigation.navigate(routes.TERMS_OF_SERVICE);
  }, [navigation]);

  const handleMaxNumber = (item) => {
    switch (item.title) {
      case i18n.t(translation.numberOfAdults.id):
        return capacity ? capacity - numberOfKids : null;
      case i18n.t(translation.numberOfKids.id):
        return capacity ? capacity - numberOfAdults : null;
      default:
        return 1;
    }
  };

  return (
    <KeyboardAwareScrollView
      style={Style.firstStepScreen}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={Style.topContainer}>
        <Text style={Style.step}>
          <I18n {...translation.step} />
        </Text>
        <Text style={Style.selectSession}>{getStepTitle()}</Text>
        <CalendarList
          current={addDays(getDefaultCurrentCalendarMonth(), 1)}
          hideArrows={true}
          enableSwipeMonths
          style={Style.calendar}
          headerStyle={Style.calendarHeader}
          theme={CustomCalendarTheme}
          markedDates={{
            ...getCalendarDateInRangeValue,
            [selectedDate]: {
              selected: true,
            },
          }}
          markingType={'custom'}
          onDayPress={changeDayHandler}
          dayComponent={Day}
          horizontal={true}
          pagingEnabled={true}
        />
      </View>
      <View style={Style.numberOfPersonsContainer}>
        <View style={Style.handleMaxContainer}>
          <Text style={Style.numberOfPersonsText}>
            <I18n {...translation.numberOfPersons} />
          </Text>
          {handleCapacity()}
        </View>

        <View style={Style.numberOfPersons}>
          {personsItems.map((item) => {
            return item ? (
              <InputNumber
                key={item.id}
                {...item}
                center={true}
                maxValue={handleMaxNumber(item)}
              />
            ) : null;
          })}
        </View>
      </View>
      <View style={Style.bottomContainer}>
        <Text style={Style.date}>{getTextDate()}</Text>
        <View style={Style.timeSlotContainer}>
          {timeSlotButtons.map((item, index) => (
            <TimeButton
              key={index}
              item={item}
              title={item.title}
              selected={getSelectedTimeOfDay(item, index)}
              Icon={item.Icon}
              onPress={setTimeSlot}
            />
          ))}
        </View>
        <View style={Style.buttonContainer}>
          <NextButton
            title={i18n.t(translation.continue.id)}
            icon={<RightArrowNoBackground />}
            onPress={handleBookOffer}
          />
          <View style={Style.bottomTextContainer}>
            <Text style={Style.textBottom(false)}>
              <I18n {...translation.byBookingYouAccept} />
            </Text>
            <TouchableOpacity onPress={onPressTermsOfService}>
              <Text style={Style.textBottom(true)}>
                <I18n {...translation.termsOfService} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FirstStep;
