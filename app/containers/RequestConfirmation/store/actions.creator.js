import * as actionTypes from './actions';

export const getRequestDetails = (data, callback) => ({
  type: actionTypes.GET_REQUEST_DETAILS,
  payload: {
    data: data,
  },
  callback,
});

export const getRequestDetailsSuccess = (payload) => ({
  type: actionTypes.GET_REQUEST_DETAILS_SUCCESS,
  payload,
});

export const getRequestDetailsError = (payload) => ({
  type: actionTypes.GET_REQUEST_DETAILS_ERROR,
  payload,
});

export const acceptRequest = (data, callback) => ({
  type: actionTypes.ACCEPT_REQUEST,
  payload: {
    data: data,
  },
  callback,
});

export const acceptRequestSuccess = () => ({
  type: actionTypes.ACCEPT_REQUEST_SUCCESS,
});

export const acceptRequestError = (payload) => ({
  type: actionTypes.ACCEPT_REQUEST_ERROR,
  payload,
});
