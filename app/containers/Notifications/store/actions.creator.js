import * as actionTypes from './actions';

export const getNotifications = (data, callback) => ({
  type: actionTypes.GET_NOTIFICATIONS,
  payload: {
    data: data,
  },
  callback,
});

export const getNotificationsSuccess = (payload) => ({
  type: actionTypes.GET_NOTIFICATIONS_SUCCESS,
  payload,
});

export const getNotificationsError = (payload) => ({
  type: actionTypes.GET_NOTIFICATIONS_ERROR,
  payload,
});
