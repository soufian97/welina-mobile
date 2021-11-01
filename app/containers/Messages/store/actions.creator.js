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

export const getChannels = (callback) => ({
  type: actionTypes.GET_CHANNELS,
  callback,
});

export const getChannelsSuccess = (payload) => ({
  type: actionTypes.GET_CHANNELS_SUCCESS,
  payload,
});

export const getChannelsError = (payload) => ({
  type: actionTypes.GET_CHANNELS_ERROR,
  payload,
});
