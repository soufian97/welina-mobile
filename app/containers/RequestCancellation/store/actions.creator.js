import * as actionTypes from './actions';

export const cancelRequest = (data, callback) => ({
  type: actionTypes.CANCEL_REQUEST,
  payload: {
    data: data,
  },
  callback,
});

export const cancelRequestSuccess = () => ({
  type: actionTypes.CANCEL_REQUEST_SUCCESS,
});

export const cancelRequestError = (payload) => ({
  type: actionTypes.CANCEL_REQUEST_ERROR,
  payload,
});

export const suggestTimeSlot = (data, callback) => ({
  type: actionTypes.SUGGEST_TIME_SLOT,
  payload: {
    data: data,
  },
  callback,
});

export const suggestTimeSlotSuccess = () => ({
  type: actionTypes.SUGGEST_TIME_SLOT_SUCCESS,
});

export const suggestTimeSlotError = (payload) => ({
  type: actionTypes.SUGGEST_TIME_SLOT_ERROR,
  payload,
});

export const acceptSuggestion = (data, callback) => ({
  type: actionTypes.ACCEPT_SUGGESTION,
  payload: {
    data: data,
  },
  callback,
});

export const acceptSuggestionSuccess = () => ({
  type: actionTypes.ACCEPT_SUGGESTION_SUCCESS,
});

export const acceptRequestError = (payload) => ({
  type: actionTypes.ACCEPT_SUGGESTION_ERROR,
  payload,
});
