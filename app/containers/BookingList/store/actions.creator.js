import * as actionTypes from './actions';

export const getBookingList = (data, callback) => ({
  type: actionTypes.GET_BOOKING,
  payload: {
    data: data,
  },
  callback,
});

export const getBookingListSuccess = (payload) => ({
  type: actionTypes.GET_BOOKING_SUCCESS,
  payload,
});

export const getBookingListError = (payload) => ({
  type: actionTypes.GET_BOOKING_ERROR,
  payload,
});

export const cancelBookingList = (data, callback) => ({
  type: actionTypes.CANCEL_BOOKING,
  payload: {
    data: data,
  },
  callback,
});

export const cancelBookingListSuccess = (payload) => ({
  type: actionTypes.CANCEL_BOOKING_SUCCESS,
  payload,
});

export const cancelBookingListError = (payload) => ({
  type: actionTypes.CANCEL_BOOKING_ERROR,
  payload,
});
