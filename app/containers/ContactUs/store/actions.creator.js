import * as actionTypes from './actions';

export const postEmail = (data, callback) => ({
  type: actionTypes.POST_EMAIL,
  payload: {
    data: data,
  },
  callback,
});

export const postEmailSuccess = () => ({
  type: actionTypes.POST_EMAIL_SUCCESS,
});

export const postEmailError = (payload) => ({
  type: actionTypes.POST_EMAIL_ERROR,
  payload,
});
