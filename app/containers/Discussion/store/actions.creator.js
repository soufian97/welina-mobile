import * as actionTypes from './actions';

export const getToken = (callback) => ({
  type: actionTypes.GET_TOKEN,
  callback,
});

export const getTokenSuccess = (payload) => ({
  type: actionTypes.GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenError = (payload) => ({
  type: actionTypes.GET_TOKEN_ERROR,
  payload,
});

export const sendSms = (data, callback) => ({
  type: actionTypes.SEND_SMS,
  payload: {
    data: data,
  },
  callback,
});

export const sendSmsSuccess = (payload) => ({
  type: actionTypes.SEND_SMS_SUCCESS,
  payload,
});

export const sendSmsError = (payload) => ({
  type: actionTypes.SEND_SMS_ERROR,
  payload,
});
