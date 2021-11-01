import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.requestSession';
const sufixFirstStep = 'components.firstStep';

export const translation = defineMessage({
  step: {
    id: `${scope}.${sufixFirstStep}.step`,
    defaultMessage: 'Step 1 of 3',
  },
  selectSession: {
    id: `${scope}.${sufixFirstStep}.selectSession`,
    defaultMessage: 'Select Session Time',
  },
  selectStartDate: {
    id: `${scope}.${sufixFirstStep}.selectStartDate`,
    defaultMessage: 'Select start day',
  },
  allDay: {
    id: `${scope}.${sufixFirstStep}.allDay`,
    defaultMessage: 'All day',
  },
  morning: {
    id: `${scope}.${sufixFirstStep}.morning`,
    defaultMessage: 'Morning',
  },
  afternoon: {
    id: `${scope}.${sufixFirstStep}.afternoon`,
    defaultMessage: 'Afternoon',
  },
  continue: {
    id: `${scope}.${sufixFirstStep}.continue`,
    defaultMessage: 'Continue',
  },
  numberOfAdults: {
    id: `${scope}.numberOfAdults`,
    defaultMessage: 'Adults',
  },
  numberOfTeens: {
    id: `${scope}.numberOfTeens`,
    defaultMessage: 'Teens',
  },
  numberOfKids: {
    id: `${scope}.numberOfKids`,
    defaultMessage: 'Kids',
  },
  numberOfPersons: {
    id: `${scope}.numberOfPersons`,
    defaultMessage: 'Number Of Persons',
  },
  huray: {
    id: `${scope}.huray`,
    defaultMessage: 'Hurraaaay',
  },
  reservationSuccess: {
    id: `${scope}.reserrvationSuccess`,
    defaultMessage:
      'Your request. Has been sent successfully to the instructor 🏄‍♂️!',
  },
  okay: {
    id: `${scope}.okay`,
    defaultMessage: 'Okay',
  },
  sessionSuccessefullyReserved: {
    id: `${scope}.sessionSuccessefullyReserved`,
    defaultMessage: 'Your session was successfully reserved',
  },
  byBookingYouAccept: {
    id: `${scope}.byBookingYouAccept`,
    defaultMessage: 'By booking you accept, our',
  },
  termsOfService: {
    id: `${scope}.termsOfService`,
    defaultMessage: ' terms of service',
  },
  capacity: {
    id: `${scope}.capacity`,
    defaultMessage: '( {{size}} persons max )',
  },
});
