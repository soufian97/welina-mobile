import * as actionTypes from './actions';

export const getReceivedRequestList = (data, callback) => ({
  type: actionTypes.GET_RECEIVED_REQUEST,
  payload: {
    data: data,
  },
  callback,
});

export const getReceivedRequestListSuccess = (payload) => ({
  type: actionTypes.GET_RECEIVED_REQUEST_SUCCESS,
  payload,
});

export const getReceivedRequestListError = (payload) => ({
  type: actionTypes.GET_RECEIVED_REQUEST_ERROR,
  payload,
});
