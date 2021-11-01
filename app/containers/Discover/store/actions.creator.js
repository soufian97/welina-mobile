import * as actionTypes from './actions';

export const getRecentSessions = (data, callback) => ({
  type: actionTypes.GET_RECENT_SESSIONS,
  payload: {
    data: data,
  },
  callback,
});

export const getRecentSessionsSuccess = (payload) => ({
  type: actionTypes.GET_RECENT_SESSIONS_SUCCESS,
  payload,
});

export const getRecentSessionsError = (payload) => ({
  type: actionTypes.GET_RECENT_SESSIONS_ERROR,
  payload,
});

export const getAvailablePackages = (data, callback) => ({
  type: actionTypes.GET_AVAILABALE_PACKAGES,
  payload: {
    data: data,
  },
  callback,
});

export const getAvailablePackagesSuccess = (payload) => ({
  type: actionTypes.GET_AVAILABALE_PACKAGES_SUCCESS,
  payload,
});

export const getAvailablePackagesError = (err) => ({
  type: actionTypes.GET_AVAILABALE_PACKAGES_ERROR,
  payload: err,
});

export const getRecentPackages = (data, callback) => ({
  type: actionTypes.GET_RECENT_PACKAGES,
  payload: {
    data: data,
  },
  callback,
});

export const getRecentPackagesSuccess = (payload) => ({
  type: actionTypes.GET_RECENT_PACKAGES_SUCCESS,
  payload,
});

export const getRecentPackagesError = (err) => ({
  type: actionTypes.GET_RECENT_PACKAGES_ERROR,
  payload: err,
});

export const getAvailableSessions = (data, callback) => ({
  type: actionTypes.GET_AVAILABALE_SESSIONS,
  payload: {
    data: data,
  },
  callback,
});

export const getAvailableSessionsSuccess = (payload) => ({
  type: actionTypes.GET_AVAILABALE_SESSIONS_SUCCESS,
  payload,
});

export const getAvailableSessionsError = (payload) => ({
  type: actionTypes.GET_AVAILABALE_SESSIONS_ERROR,
  payload,
});
