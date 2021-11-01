import * as actionTypes from './actions';

export const addReviewAction = (data, callback) => ({
  type: actionTypes.ADD_REVIEW,
  payload: {
    data: data,
  },
  callback,
});

export const addReviewSuccess = () => ({
  type: actionTypes.ADD_REVIEW_SUCCESS,
});

export const addReviewError = (payload) => ({
  type: actionTypes.ADD_REVIEW_ERROR,
  payload,
});
