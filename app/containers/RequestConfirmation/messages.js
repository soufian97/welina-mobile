import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.requestConfirtmation';

export const translation = defineMessage({
  recivingRequest: {
    id: `${scope}.recivingRequest`,
    defaultMessage: 'Receiving request',
  },
  hi: {
    id: `${scope}.hi`,
    defaultMessage: 'Hi, {{name}}',
  },
  youRecivedNewRequest: {
    id: `${scope}.youRecivedNewRequest`,
    defaultMessage: 'You received new request',
  },
  duration: {
    id: `${scope}.duration`,
    defaultMessage: 'Duration :',
  },
  servicePrice: {
    id: `${scope}.servicePrice`,
    defaultMessage: 'Service Price',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total : {{price}}',
  },
  day: {
    id: `${scope}.day`,
    defaultMessage: ' {{day}}x Day',
  },
  groupSize: {
    id: `${scope}.groupSize`,
    defaultMessage: '{{number}}x Person',
  },
  securePayment: {
    id: `${scope}.securePayment`,
    defaultMessage: '100% Secure payment',
  },
  directMessage: {
    id: `${scope}.directMessage`,
    defaultMessage: 'Direct Message',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  accept: {
    id: `${scope}.accept`,
    defaultMessage: 'Accept',
  },
  decline: {
    id: `${scope}.decline`,
    defaultMessage: 'Decline',
  },
  requestAccepted: {
    id: `${scope}.requestAccepted`,
    defaultMessage: 'Request Accepted',
  },
  yourRequestHasbeenSent: {
    id: `${scope}.yourRequestHasbeenSent`,
    defaultMessage:
      'You request has been sent to Tarik Wahbi Please get in touch to convince time/place to meet.',
  },
  reservationDetails: {
    id: `${scope}.reservationDetails`,
    defaultMessage: 'Details of Reservation',
  },
  scheduledSessionTitle: {
    id: `${scope}.scheduledSessionTitle`,
    defaultMessage: 'Here is the details of your scheduled session',
  },
  pastSessionTitle: {
    id: `${scope}.pastSessionTitle`,
    defaultMessage: 'Your Past Session',
  },
  pastSessionBody: {
    id: `${scope}.pastSessionBody`,
    defaultMessage:
      'Here are the details of your past session, if you want to rate this surfer please visit his or her profile',
  },
});
