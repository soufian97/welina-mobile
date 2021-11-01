import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const HOME_REDUCER = 'homeReducer';

export const initialState = {
  isLoading: false,
  error: null,
  message: null,
  modalVisibility: false,
  successModalVisibility: false,
  pastEventsModalVisibility: false,
  toast: {
    visibility: false,
    title: null,
    body: null,
    type: null,
  },
  betaTestModalOpen: false,
  betaTestSticker: false,
  betaGeneralTestModalOpen: false,
  betaSuccessModalVisibility: false,
  betaReminderDate: null,
  hasNewNotification: false,
};

const appReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_DATE_TO_SHOW_FEEDBACK_MODAL:
      case actionTypes.ADD_BETA_REVIEW:
      case actionTypes.AUTH_SIGNIN:
      case actionTypes.ADD_BETA_GENERAL_REVIEW: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.ADD_BETA_GENERAL_REVIEW_SUCCESS:
      case actionTypes.AUTH_SIGNIN_ERROR:
      case actionTypes.AUTH_SIGNIN_SUCCESS:
      case actionTypes.ADD_BETA_REVIEW_SUCCESS:
      case actionTypes.AUTH_SIGNIN_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.OPEN_MODAL: {
        draft.modalVisibility = true;
        draft.error = payload;
        break;
      }
      case actionTypes.CLOSE_MODAL: {
        draft.modalVisibility = false;
        break;
      }
      case actionTypes.OPEN_SUCCESS_MODAL: {
        draft.successModalVisibility = true;
        draft.message = payload;
        break;
      }
      case actionTypes.CLOSE_SUCCESS_MODAL: {
        draft.successModalVisibility = false;
        break;
      }
      case actionTypes.OPEN_TOAST: {
        draft.toast.visibility = true;
        draft.toast.title = payload.title;
        draft.toast.body = payload.body;
        draft.toast.type = payload.type;
        break;
      }
      case actionTypes.CLOSE_TOAST: {
        draft.toast.visibility = false;
        draft.toast.title = null;
        draft.toast.body = null;
        draft.toast.type = null;
        break;
      }
      case actionTypes.OPEN_MODAL_PAST_EVENTS: {
        draft.pastEventsModalVisibility = true;
        break;
      }
      case actionTypes.CLOSE_MODAL_PAST_EVENTS: {
        draft.pastEventsModalVisibility = false;
        break;
      }
      case actionTypes.GET_DATE_TO_SHOW_FEEDBACK_MODAL_ERROR:
      case actionTypes.ADD_BETA_GENERAL_REVIEW_ERROR:
      case actionTypes.ADD_BETA_REVIEW_ERROR: {
        draft.error = payload?.response;
        draft.isLoading = false;
        break;
      }
      case actionTypes.OPEN_BETA_TEST_MODAL: {
        draft.betaTestModalOpen = true;
        break;
      }
      case actionTypes.CLOSE_BETA_TEST_MODAL: {
        draft.betaTestModalOpen = false;
        break;
      }
      case actionTypes.OPEN_BETA_GENERAL_TEST_MODAL: {
        draft.betaGeneralTestModalOpen = true;
        break;
      }
      case actionTypes.CLOSE_BETA_GENERAL_TEST_MODAL: {
        draft.betaGeneralTestModalOpen = false;
        break;
      }
      case actionTypes.DISPLAY_STICKER: {
        draft.betaTestSticker = true;
        break;
      }
      case actionTypes.HIDE_STICKER: {
        draft.betaTestSticker = false;
        break;
      }
      case actionTypes.DISPLAY_SUCCESS_BETA_TEST_MODAL: {
        draft.betaSuccessModalVisibility = true;
        break;
      }
      case actionTypes.HIDE_SUCCESS_BETA_TEST_MODAL: {
        draft.betaSuccessModalVisibility = false;
        break;
      }
      case actionTypes.GET_DATE_TO_SHOW_FEEDBACK_MODAL_SUCCESS: {
        draft.betaReminderDate = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.HAS_NEW_NOTIFICATION: {
        draft.hasNewNotification = true;
        break;
      }
      case actionTypes.SEEN_NEW_NOTIFICATION: {
        draft.hasNewNotification = false;
        break;
      }
    }
  });

export default {
  key: HOME_REDUCER,
  reducer: appReducer,
};
