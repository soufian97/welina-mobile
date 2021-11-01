import {
  LOGOUT_MODAL,
  DEACTIVATION_MODAL,
  SEE_PAST_EVENT_MODAL,
  BETA_TEST_SCREEN_MODAL,
  BETA_TEST_GENERAL_MODAL,
  BETA_TEST_REMINDER_MODAL,
  ERROR_MODAL,
} from '../../config/app.constant';
import LogoutPopup from '../DrawerMenu/components/LogoutPopup';
import DisableAccountPopup from '../../components/PopupModals/DisableAccountPopup';
import SeePastEventsPopup from '../../components/SeePastEventsPopup';
import BetaTestFeedback from '../../components/BetaTestFeedback';
import BetaGeneralFeedBack from '../../components/BetaGeneralFeedBack';
import ReminderFeedbackModal from '../../components/ReminderFeedbackModal';
import Popup from '../../components/PopupModals/Popup';

const modalsList = {
  [LOGOUT_MODAL]: {
    Component: LogoutPopup,
    style: {},
  },
  [DEACTIVATION_MODAL]: {
    Component: DisableAccountPopup,
    style: {},
  },
  [SEE_PAST_EVENT_MODAL]: {
    Component: SeePastEventsPopup,
    style: {},
  },
  [BETA_TEST_SCREEN_MODAL]: {
    Component: BetaTestFeedback,
    style: {},
  },
  [BETA_TEST_GENERAL_MODAL]: {
    Component: BetaGeneralFeedBack,
    style: {},
  },
  [BETA_TEST_REMINDER_MODAL]: {
    Component: ReminderFeedbackModal,
    style: {},
  },
  [ERROR_MODAL]: {
    Component: Popup,
    style: {},
  },
  null: {
    Component: () => null,
    style: {},
  },
};
export default modalsList;
