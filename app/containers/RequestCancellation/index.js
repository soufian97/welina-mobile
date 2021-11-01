import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { Style, CustomCalendarTheme } from './style';
import { translation } from './messages';
import I18n from '../../components/I18n';
import GoBackHeader from '../../components/Headers/GobackHeader';
import CalendarSlot from '../../components/CalendarSlot';
import { addDays, isAfter } from 'date-fns';
import Button from '../../components/Buttons/Button';
import i18n from '../../config/i18n';
import { Quote } from '../../assets/svgs';
import { colors } from '../../utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { routes } from '../../utils/navigation/routes';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import {
  cancelRequest,
  suggestTimeSlot,
  acceptSuggestion,
} from './store/actions.creator';
import requestCancellationReducerConfig from './store/reducer';
import requestCancellationSagaConfig from './store/saga';
import { getRequestCancellationLoaderSelector } from './store/selectors';
import { isEmpty } from 'lodash';
import {
  getCurrentDateFormatter,
  getDateFormatter,
  getDateRangeOfDate,
} from '../../utils/date/dateFormater';
import { CalendarList } from 'react-native-calendars';
import Day from '../RequestSession/Components/Day';
import LogoutPopup from '../DrawerMenu/components/LogoutPopup';
import bookingListSagaConfig from '../BookingList/store/saga';
import { cancelBookingList } from '../BookingList/store/actions.creator';
import { getBookingListLoaderSelector } from '../BookingList/store/selectors';
import { ERROR_MODAL } from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';
import FullScreenLoader from '../../components/FullScreenLoader';

const { width } = Dimensions.get('window');
const size = { radius: 25, height: 45, width: width * 0.4 };

const RequestCancellation = ({
  navigation,
  route,
  isLoading,
  cancelRequest,
  suggestTimeSlot,
  acceptSuggestion,
  cancelBookingList,
  declineReservationLoader,
  openModal,
}) => {
  useInjectReducer(requestCancellationReducerConfig);
  useInjectSaga(requestCancellationSagaConfig);
  useInjectSaga(bookingListSagaConfig);
  const { requestId, suggestedTimeSlot: coachSuggestion } = route.params;
  const [selectedRange, setSelectedRange] = useState({
    startingDay: getCurrentDateFormatter(),
    endingDay: getDateFormatter(
      addDays(new Date(getCurrentDateFormatter()), 3),
    ),
  });
  const [message, setMessage] = useState(
    !isEmpty(coachSuggestion) ? coachSuggestion.message : '',
  );
  const [selectedDate, setSelectedDate] = useState(coachSuggestion?.startDate);

  const [
    cancellationModalVisibility,
    setCancellationModalVisibility,
  ] = useState(false);

  const onPressCancelCancellation = useCallback(() => {
    setCancellationModalVisibility(false);
  }, []);

  const cancelRequestCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        if (isEmpty(coachSuggestion)) {
          navigation.replace(routes.COACH_REQUESTS);
        } else {
          navigation.replace(routes.BOOKING_LIST, { requestId });
        }
      }
    },
    [coachSuggestion, navigation, openModal, requestId],
  );

  const confirmSuggestionCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else {
        navigation.navigate(routes.BOOKING_LIST, { requestId });
      }
    },
    [navigation, openModal, requestId],
  );

  const cancellationHandler = useCallback(() => {
    setCancellationModalVisibility(false);
    if (isEmpty(coachSuggestion)) {
      cancelRequest({ id: requestId }, cancelRequestCallback);
    } else {
      cancelBookingList(requestId, cancelRequestCallback);
    }
  }, [
    cancelBookingList,
    cancelRequest,
    cancelRequestCallback,
    coachSuggestion,
    requestId,
  ]);

  const onPressCancelButton = useCallback(() => {
    setCancellationModalVisibility(true);
  }, []);

  const sendSuggestionHandler = useCallback(() => {
    suggestTimeSlot(
      {
        id: requestId,
        suggestion: {
          message,
          startDate: selectedRange.startingDay,
          endDate: selectedRange.endingDay,
        },
      },
      cancelRequestCallback,
    );
  }, [
    cancelRequestCallback,
    message,
    requestId,
    selectedRange.endingDay,
    selectedRange.startingDay,
    suggestTimeSlot,
  ]);
  const acceptCoachSuggestionHandler = useCallback(() => {
    acceptSuggestion(
      { requestId, newDate: selectedDate },
      confirmSuggestionCallback,
    );
  }, [acceptSuggestion, confirmSuggestionCallback, requestId, selectedDate]);

  const renderScreenTitle = useCallback(
    () =>
      coachSuggestion ? (
        <I18n {...translation.confirmSuggestion} />
      ) : (
        <I18n {...translation.screenTitle} />
      ),
    [coachSuggestion],
  );

  const getDefaultCurrentCalendarMonth = () =>
    isAfter(new Date(), new Date(coachSuggestion?.startDate))
      ? new Date()
      : new Date(coachSuggestion?.startDate);

  const getCalendarDateInRange = useCallback(() => {
    const dateInRange = {};
    getDateRangeOfDate(
      isAfter(new Date(), new Date(coachSuggestion?.startDate))
        ? getCurrentDateFormatter()
        : coachSuggestion?.startDate,
      coachSuggestion?.endDate,
      false,
    ).forEach((date) => {
      dateInRange[date] = {
        color: colors.BLUE_HIGH_OPACITY,
        isSelectable: true,
      };
    });
    return dateInRange;
  }, [coachSuggestion]);

  const changeDayHandler = useCallback((date) => {
    setSelectedDate(date.dateString);
  }, []);

  const renderCalender = () =>
    coachSuggestion ? (
      <CalendarList
        current={getDefaultCurrentCalendarMonth()}
        hideArrows={true}
        enableSwipeMonths
        style={Style.calendar}
        headerStyle={Style.calendarHeader}
        theme={CustomCalendarTheme}
        markedDates={{
          ...getCalendarDateInRange(),
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
    ) : (
      <View style={Style.calendarCardContainer}>
        <CalendarSlot
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          calendarDimensions={width * 0.9}
        />
      </View>
    );

  const renderButton = useCallback(
    () =>
      isEmpty(coachSuggestion) ? (
        <Button
          size={size}
          title={i18n.t(translation.send.id)}
          onPress={sendSuggestionHandler}
        />
      ) : (
        <Button
          size={size}
          title={i18n.t(translation.confirm.id)}
          onPress={acceptCoachSuggestionHandler}
        />
      ),
    [acceptCoachSuggestionHandler, coachSuggestion, sendSuggestionHandler],
  );
  const renderTextInput = useCallback(() => {
    if (!isEmpty(coachSuggestion)) {
      return message ? (
        <View style={Style.coachMessageContainer}>
          <Quote />
          <TextInput
            editable={isEmpty(coachSuggestion)}
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={8}
            placeholder={i18n.t(translation.wirteMessage.id)}
            placeholderTextColor={colors.GRAY}
            style={Style.inputText}
          />
        </View>
      ) : null;
    } else {
      return (
        <View style={Style.coachMessageContainer}>
          <Quote />
          <TextInput
            editable={isEmpty(coachSuggestion)}
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={8}
            placeholder={i18n.t(translation.wirteMessage.id)}
            placeholderTextColor={colors.GRAY}
            style={Style.inputText}
          />
        </View>
      );
    }
  }, [coachSuggestion, message]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={Style.screen}>
        <GoBackHeader />
        <Modal
          animationType="fade"
          transparent={true}
          visible={cancellationModalVisibility}
        >
          <LogoutPopup
            agreePressed={cancellationHandler}
            disagreePressed={onPressCancelCancellation}
            question={i18n.t(translation.cancelQuestion.id)}
            questionDetails={i18n.t(translation.cancelContent.id)}
          />
        </Modal>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <Text style={Style.textScreenTitle}>{renderScreenTitle()}</Text>
          {renderCalender()}
          {renderTextInput()}
          <View style={Style.buttonContainer}>
            {renderButton()}
            <Button
              color={[colors.SECONDARY, colors.SECONDARY]}
              size={size}
              title={i18n.t(translation.decline.id)}
              onPress={onPressCancelButton}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <FullScreenLoader visible={isLoading || declineReservationLoader} />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: getRequestCancellationLoaderSelector(),
  declineReservationLoader: getBookingListLoaderSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      cancelRequest,
      suggestTimeSlot,
      acceptSuggestion,
      cancelBookingList,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RequestCancellation);
