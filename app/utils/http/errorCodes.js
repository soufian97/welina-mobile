// import i18n from '../../config/i18n';
import i18n from '../../config/i18n';
import { translation } from '../../components/PopupModals/messages';
// import { translation } from '../../components/Popup/messages';

const NO_ATENDEE_SELECTED = 0;
export const SESSION_NOT_EXIST = 1;
const COACH_NOT_FOUND = 2;
const SURFER_NOT_FOUND = 4;
const RESERVATION_DATE_OUTDATED = 5;
const TIMESLOT_BOOKED = 6;
const AUTH_ERROR = 8;
const EMAIL_EXISTS = 17;
export const USER_NOT_FOUND = 18;
const INVALID_OTP = 19;
const INVALID_PHONE_NUMBER = 20;
const PHONE_NUMBER_EXISTS = 21;
export const PACKAGE_NOT_EXIST = 24;
const BAD_CREDENTIALS = 26;
export const ACCESS_DENIED = 9;
export const USER_NOT_ACTIVE = 22;
export const PHONE_NUMBER_REQUIRED = 23;
export const DATE_ALREADY_BOOKED = 28;
const NEW_PASSWORD_REQUIRED = 31;
const CURRENT_PASSWORD_NOT_MATCH = 32;
const OFFER_START_DATE_OUTDATED = 51;
const EXEEDED_NUMBER_OF_PARTICIPANTS = 36;
const FILE_LIMITE_SIZE = 60;
const CANT_CANCEL_NON_PENDING_REQUEST = 61;
const CANT_BOOK_OFFER = 64;
const BASIC_INFO_ONE_URL = 43;
const REMOVE_REQUESTS_BEFORE_DEACTIVATE_YOUR_ACCOUNT = 66;

export const errors = (code) => {
  switch (code) {
    case NO_ATENDEE_SELECTED: {
      return i18n.t(translation.noAtendeeSelected.id);
    }
    case COACH_NOT_FOUND:
      return i18n.t(translation.coachNotFound.id);

    case SURFER_NOT_FOUND:
      return i18n.t(translation.surferNotFound.id);

    case RESERVATION_DATE_OUTDATED:
      return i18n.t(translation.reservationDateOutdated.id);

    case TIMESLOT_BOOKED:
      return i18n.t(translation.timeSlotBooked.id);

    case AUTH_ERROR:
    case BAD_CREDENTIALS:
      return i18n.t(translation.authError.id);

    case EMAIL_EXISTS:
      return i18n.t(translation.emailAlreadyExist.id);

    case USER_NOT_FOUND:
      return i18n.t(translation.userNotFound.id);

    case INVALID_OTP:
      return i18n.t(translation.invalidOtp.id);

    case INVALID_PHONE_NUMBER:
      return i18n.t(translation.invalidPhoneNumber.id);

    case PHONE_NUMBER_EXISTS:
      return i18n.t(translation.phoneNumberAlreadyUsed.id);

    case USER_NOT_ACTIVE:
      return i18n.t(translation.userNotActive.id);

    case CURRENT_PASSWORD_NOT_MATCH:
    case NEW_PASSWORD_REQUIRED:
      return i18n.t(translation.passwordCheckRequired.id);

    case OFFER_START_DATE_OUTDATED:
      return i18n.t(translation.offerStartDateOutdated.id);

    case EXEEDED_NUMBER_OF_PARTICIPANTS:
      return i18n.t(translation.exeededNumberOfParticipants.id);

    case FILE_LIMITE_SIZE:
      return i18n.t(translation.fileSizeExceeded.id);

    case BASIC_INFO_ONE_URL:
      return i18n.t(translation.atLeastOneUrl.id);

    case CANT_CANCEL_NON_PENDING_REQUEST:
      return i18n.t(translation.cantCancel.id);

    case PACKAGE_NOT_EXIST:
    case SESSION_NOT_EXIST:
      return i18n.t(translation.offerNotExist.id);

    case CANT_BOOK_OFFER:
      return i18n.t(translation.cantBookOfferTwice.id);

    case REMOVE_REQUESTS_BEFORE_DEACTIVATE_YOUR_ACCOUNT:
      return i18n.t(translation.cantDeactivate.id);

    default:
      return i18n.t(translation.defaultError.id);
  }
};
