import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.containers.popupModals';

export const translation = defineMessage({
  defaultError: {
    id: `${scope}.defaultError`,
    defaultMessage:
      'an error occurred, please check your network setting or try again',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go back',
  },
  sessionNotFound: {
    id: `${scope}.sessionNotFound`,
    defaultMessage: "We can't found this session, please try later",
  },
  coachNotFound: {
    id: `${scope}.coachNotFound`,
    defaultMessage: "We can't found this coach, please try later",
  },
  surferNotFound: {
    id: `${scope}.surferNotFound`,
    defaultMessage: "We can't found this surfer, please try later",
  },
  reservationDateOutdated: {
    id: `${scope}.reservationDateOutdated`,
    defaultMessage: 'Reservation date outdated, please choose another date',
  },
  timeSlotBooked: {
    id: `${scope}.timeSlotBooked`,
    defaultMessage:
      'This time slot is already booked, please choose another time slot',
  },
  emailAlreadyExist: {
    id: `${scope}.emailAlreadyExist`,
    defaultMessage: 'This email already exist, please choose another email',
  },
  phoneNumberAlreadyUsed: {
    id: `${scope}.phoneNumberAlreadyUsed`,
    defaultMessage:
      'This phone number is already in use, please choose another one',
  },
  createNewPassword: {
    id: `${scope}.createNewPassword`,
    defaultMessage: 'Create new password',
  },
  pleaseDonotSharePassword: {
    id: `${scope}.pleaseDonotSharePassword`,
    defaultMessage: 'Please do not share your password with anyone ',
  },
  confimPassword: {
    id: `${scope}.confimPassword`,
    defaultMessage: 'Confirm password',
  },
  didnotMatch: {
    id: `${scope}.didnotMatch`,
    defaultMessage: 'Passwords do not match. Try again.',
  },
  userNotFound: {
    id: `${scope}.userNotFound`,
    defaultMessage: 'User not found, please try with correct credentials',
  },
  userNotActive: {
    id: `${scope}.userNotActive`,
    defaultMessage:
      'User not active, please complete your registration process',
  },
  invalidOtp: {
    id: `${scope}.invalidOtp`,
    defaultMessage: 'Invalid code, please enter the code you received',
  },
  authError: {
    id: `${scope}.authError`,
    defaultMessage:
      'Phone number or password incorrect, please enter valid credentials',
  },
  invalidPhoneNumber: {
    id: `${scope}.invalidPhoneNumber`,
    defaultMessage: 'This phone number is invalid, please enter another one.',
  },
  newPasswordRequired: {
    id: `${scope}.newPasswordRequired`,
    defaultMessage: 'New valid password is required',
  },
  passwordCheckRequired: {
    id: `${scope}.passwordCheckRequired`,
    defaultMessage: 'Your current password or new password is invalid',
  },
  noAtendeeSelected: {
    id: `${scope}.noAtendeeSelected`,
    defaultMessage: 'Cannot book offer, please add an attendee',
  },
  offerStartDateOutdated: {
    id: `${scope}.offerStartDateOutdated`,
    defaultMessage: 'Offer start date outdated',
  },
  exeededNumberOfParticipants: {
    id: `${scope}.exeededNumberOfParticipant`,
    defaultMessage: 'Exceeded number of participants for individual package',
  },
  fileSizeExceeded: {
    id: `${scope}.fileSizeExceeded`,
    defaultMessage:
      'One of your files has exceeded the limit, please re-upload another file',
  },
  atLeastOneUrl: {
    id: `${scope}.atLeastOneUrl`,
    defaultMessage: 'At least one URL is required',
  },
  offerNotExist: {
    id: `${scope}.offerNotExist`,
    defaultMessage: 'Oops! this offer is no longer exists',
  },
  cantCancel: {
    id: `${scope}.cantCancel`,
    defaultMessage: "Oops! you can't cancel a non pending request",
  },
  cantBookOfferTwice: {
    id: `${scope}.cantBookOfferTwice`,
    defaultMessage: 'cannot book an offer twice in the same day',
  },
  disableMessage: {
    id: `${scope}.disableMessage`,
    defaultMessage: 'Are you sure you want to deactivate your account?',
  },
  notConnected: {
    id: `${scope}.notConnected`,
    defaultMessage: 'You are not connected yet',
  },
  disagree: {
    id: `${scope}.disagree`,
    defaultMessage: 'No',
  },
  agree: {
    id: `${scope}.agree`,
    defaultMessage: 'Yes',
  },
  agreeNotConnected: {
    id: `${scope}.agreeNotConnected`,
    defaultMessage: 'Ok',
  },
  welcomeAgain: {
    id: `${scope}.welcomeAgain`,
    defaultMessage: 'Welcome back {{name}}!',
  },
  goDashboard: {
    id: `${scope}.goDashboard`,
    defaultMessage: 'Go to home dashboard',
  },
  cantDeactivate: {
    id: `${scope}.cantDeactivate`,
    defaultMessage:
      "you can't deactivate your account you have pending request",
  },
});
