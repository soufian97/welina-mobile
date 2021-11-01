import * as actionTypes from './actions';

export const getEvents = (data, callback) => ({
  type: actionTypes.GET_EVENTS,
  payload: {
    data: data,
  },
  callback,
});

export const getEventsSuccess = (payload) => ({
  type: actionTypes.GET_EVENTS_SUCCESS,
  payload,
});

export const getEventsError = (payload) => ({
  type: actionTypes.GET_EVENTS_ERROR,
  payload,
});
