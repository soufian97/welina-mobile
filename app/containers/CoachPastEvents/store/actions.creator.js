import * as actionTypes from './actions';

export const getPastRequestList = (data, callback) => ({
  type: actionTypes.GET_PAST_REQUEST,
  payload: {
    data: data,
  },
  callback,
});

export const getPastRequestListSuccess = (payload) => ({
  type: actionTypes.GET_PAST_REQUEST_SUCCESS,
  payload,
});

export const getPastRequestListError = (payload) => ({
  type: actionTypes.GET_PAST_REQUEST_ERROR,
  payload,
});
