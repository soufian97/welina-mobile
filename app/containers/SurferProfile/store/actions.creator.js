import * as actionTypes from './actions';

export const getSurferInfo = (data, callback) => ({
  type: actionTypes.GET_SURFER_INFO,
  payload: {
    data: data,
  },
  callback,
});

export const getSurferInfoSuccess = (payload) => ({
  type: actionTypes.GET_SURFER_INFO_SUCCESS,
  payload,
});

export const getSurferInfoError = (payload) => ({
  type: actionTypes.GET_SURFER_INFO_ERROR,
  payload,
});

export const getReviews = (data, callback) => ({
  type: actionTypes.GET_REVIEWS,
  payload: {
    data: data,
  },
  callback,
});

export const getReviewsSuccess = (payload) => ({
  type: actionTypes.GET_REVIEWS_SUCCESS,
  payload,
});

export const getReviewsError = (payload) => ({
  type: actionTypes.GET_REVIEWS_ERROR,
  payload,
});
