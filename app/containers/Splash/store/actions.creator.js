import * as actionTypes from './actions';

export const closeModalAction = () => ({
  type: actionTypes.CLOSE_MODAL,
});

export const openModalAction = (err) => ({
  type: actionTypes.OPEN_MODAL,
  payload: err,
});

export const closeToast = () => ({
  type: actionTypes.CLOSE_TOAST,
});

export const openToast = (data) => ({
  type: actionTypes.OPEN_TOAST,
  payload: data,
});

export const signIn = (data, callback) => ({
  type: actionTypes.AUTH_SIGNIN,
  payload: { data },
  callback,
});

export const signInSuccess = (payload) => ({
  type: actionTypes.AUTH_SIGNIN_SUCCESS,
  payload,
});
export const signInError = (payload) => ({
  type: actionTypes.AUTH_SIGNIN_ERROR,
  payload,
});

export const closeSuccessModalAction = () => ({
  type: actionTypes.CLOSE_SUCCESS_MODAL,
});

export const openSuccessModalAction = (message) => ({
  type: actionTypes.OPEN_SUCCESS_MODAL,
  payload: message,
});

export const openModalPastEvents = () => ({
  type: actionTypes.OPEN_MODAL_PAST_EVENTS,
});

export const closeModalPastEvents = () => ({
  type: actionTypes.CLOSE_MODAL_PAST_EVENTS,
});

export const addBetaReviewAction = (data, callback) => ({
  type: actionTypes.ADD_BETA_REVIEW,
  payload: {
    data: data,
  },
  callback,
});

export const addBetaReviewSuccess = () => ({
  type: actionTypes.ADD_BETA_REVIEW_SUCCESS,
});

export const addBetaReviewError = (payload) => ({
  type: actionTypes.ADD_BETA_REVIEW_ERROR,
  payload,
});

export const closeBetaTestModalAction = () => ({
  type: actionTypes.CLOSE_BETA_TEST_MODAL,
});

export const openBetaTestModalAction = () => ({
  type: actionTypes.OPEN_BETA_TEST_MODAL,
});

export const displayBetaTestStickerAction = () => ({
  type: actionTypes.DISPLAY_STICKER,
});

export const hideBetaTestStickerAction = () => ({
  type: actionTypes.HIDE_STICKER,
});

export const addBetaGeneralReviewAction = (data, callback) => ({
  type: actionTypes.ADD_BETA_GENERAL_REVIEW,
  payload: {
    data: data,
  },
  callback,
});

export const addBetaGeneralReviewSuccess = () => ({
  type: actionTypes.ADD_BETA_GENERAL_REVIEW_SUCCESS,
});

export const addBetaGeneralReviewError = (payload) => ({
  type: actionTypes.ADD_BETA_GENERAL_REVIEW_ERROR,
  payload,
});

export const closeBetaGeneralTestModalAction = () => ({
  type: actionTypes.CLOSE_BETA_GENERAL_TEST_MODAL,
});

export const openBetaGeneralTestModalAction = () => ({
  type: actionTypes.OPEN_BETA_GENERAL_TEST_MODAL,
});

export const setDateToShoWFeedBackModal = (data, callback) => ({
  type: actionTypes.SET_DATE_TO_SHOW_FEEDBACK_MODAL,
  payload: {
    data: data,
  },
  callback,
});

export const setDateToShoWFeedBackModalSuccess = () => ({
  type: actionTypes.SET_DATE_TO_SHOW_FEEDBACK_MODAL_SUCCESS,
});

export const setDateToShoWFeedBackModalError = (payload) => ({
  type: actionTypes.SET_DATE_TO_SHOW_FEEDBACK_MODAL_ERROR,
  payload,
});

export const getDateToShoWFeedBackModal = (data, callback) => ({
  type: actionTypes.GET_DATE_TO_SHOW_FEEDBACK_MODAL,
  payload: {
    data: data,
  },
  callback,
});

export const getDateToShoWFeedBackModalSuccess = (payload) => ({
  type: actionTypes.GET_DATE_TO_SHOW_FEEDBACK_MODAL_SUCCESS,
  payload,
});

export const getDateToShoWFeedBackModalError = (payload) => ({
  type: actionTypes.GET_DATE_TO_SHOW_FEEDBACK_MODAL_ERROR,
  payload,
});

export const displayBetaTestSuccessModalAction = () => ({
  type: actionTypes.DISPLAY_SUCCESS_BETA_TEST_MODAL,
});

export const hideBetaTestSuccessModalAction = () => ({
  type: actionTypes.HIDE_SUCCESS_BETA_TEST_MODAL,
});

export const hasNewNotification = () => ({
  type: actionTypes.HAS_NEW_NOTIFICATION,
});

export const seenNewNotification = () => ({
  type: actionTypes.SEEN_NEW_NOTIFICATION,
});
