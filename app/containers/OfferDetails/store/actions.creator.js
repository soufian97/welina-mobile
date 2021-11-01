import * as actionTypes from './actions';

export const getSessionDetails = (data, callback) => ({
  type: actionTypes.GET_SESSION_DETAILS,
  payload: {
    data: data,
  },
  callback,
});

export const getSessionDetailsSuccess = (payload) => ({
  type: actionTypes.GET_SESSION_DETAILS_SUCCESS,
  payload,
});

export const getSessionDetailsError = (payload) => ({
  type: actionTypes.GET_SESSION_DETAILS_ERROR,
  payload,
});

export const getPackageDetails = (data, callback) => ({
  type: actionTypes.GET_PACKAGE_DETAILS,
  payload: {
    data: data,
  },
  callback,
});

export const getPackageDetailsSuccess = (payload) => ({
  type: actionTypes.GET_PACKAGE_DETAILS_SUCCESS,
  payload,
});

export const getPackageDetailsError = (payload) => ({
  type: actionTypes.GET_PACKAGE_DETAILS_ERROR,
  payload,
});
