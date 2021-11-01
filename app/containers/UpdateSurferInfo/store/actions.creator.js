import * as actionTypes from './actions';

export const updateInfo = (data, callback) => ({
  type: actionTypes.UPDATE_INFO,
  payload: { data },
  callback,
});

export const updateInfoSuccess = () => ({
  type: actionTypes.UPDATE_INFO_SUCCESS,
});

export const updateInfoError = (payload) => ({
  type: actionTypes.UPDATE_INFO_ERROR,
  payload,
});
