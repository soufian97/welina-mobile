import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ScrollView, View, Text } from 'react-native';
import GoBackHeader from '../../components/Headers/GobackHeader';
import I18n from '../../components/I18n';
import { Style } from './style';
import { translation } from './messages';
import { dateRange, getMonthsDays } from '../../utils/date/datesRange';
import { addYears, startOfToday, addDays } from 'date-fns';
import DayPicker from '../../components/DayPicker';
import {
  ALL_DAY,
  AFTERNOON,
  MORNING,
  BOOKED,
  ERROR_MODAL,
} from '../../config/app.constant';
import EventCard from './components/EventCard';
import i18n from '../../config/i18n';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { getEventsSelector } from './store/selectors';
import { getEvents } from './store/actions.creator';
import coachScheduleReducerConfig from './store/reducer';
import coachScheduleSagaConfig from './store/saga';
import { getDateFormatter } from '../../utils/date/dateFormater';
import { max } from 'lodash';
import { routes } from '../../utils/navigation/routes';
import { openModal } from '../Modal/store/actions.creator';

const timeSlotValue = { [MORNING]: 0, [ALL_DAY]: 1, [AFTERNOON]: 2 };
const CoachSchedule = ({ events, navigation, getEvents, openModal }) => {
  useInjectReducer(coachScheduleReducerConfig);
  useInjectSaga(coachScheduleSagaConfig);
  const months = useMemo(
    () => dateRange(startOfToday(), addYears(startOfToday(), 1)),
    [],
  );
  const [monthsDays, setMonthsDays] = useState(getMonthsDays(months[0].value));
  const [selectedMonth, setSelectedMonth] = useState(months[0].value);
  const [selectedDay, setSelectedDay] = useState(monthsDays[0].number);

  const getEventsCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [openModal],
  );

  const getOtherDateLabel = useCallback(() => {
    const selected = selectedMonth;
    selected.setDate(selectedDay);
    return getDateFormatter(selected);
  }, [selectedDay, selectedMonth]);

  const getDateLabel = useCallback(() => {
    switch (selectedDay) {
      case new Date().getDate():
        return i18n.t(translation.today.id);
      case addDays(new Date(), +1).getDate():
        return 'Tomorrow';
      default:
        return getOtherDateLabel();
    }
  }, [getOtherDateLabel, selectedDay]);

  useEffect(() => {
    const selected = selectedMonth;
    selected.setDate(selectedDay);
    getEvents(getDateFormatter(selected), getEventsCallback);
  }, [getEvents, getEventsCallback, selectedDay, selectedMonth]);

  const getTimeLines = () =>
    Array(max([2 * events.length, 8]))
      .fill(0)
      .map((_, index) => <View key={index} style={Style.splitterLine} />);

  const handleReservationPressed = useCallback(
    (id) => {
      navigation.navigate(routes.REQUEST_CONFIRMATION, {
        requestId: id,
        source: BOOKED,
      });
    },
    [navigation],
  );

  const getSchedule = useCallback(() => {
    return [...events]
      .sort((a, b) => timeSlotValue[a.timeOfDay] - timeSlotValue[b.timeOfDay])
      .map((event, index) => (
        <EventCard
          key={index}
          {...event}
          handleEventPressed={handleReservationPressed}
        />
      ));
  }, [events, handleReservationPressed]);

  return (
    <View
      style={Style.screen}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <GoBackHeader navigation={navigation} />
      <Text style={Style.textTitle}>
        <I18n {...translation.mySchedule} />
      </Text>
      <View style={Style.selectedDateContainer}>
        <DayPicker
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setSelectedMonth={setSelectedMonth}
          selectedMonth={selectedMonth}
          setMonthsDays={setMonthsDays}
          monthsDays={monthsDays}
          months={months}
          title={getDateLabel()}
        />
      </View>
      <Text style={Style.textTitleContainer}>
        <I18n {...translation.schedule} />
      </Text>
      <View style={Style.scheduleContainer}>
        <View style={Style.splitterContainer}>{getTimeLines()}</View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {getSchedule()}
        </ScrollView>
      </View>
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  events: getEventsSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getEvents,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CoachSchedule);
