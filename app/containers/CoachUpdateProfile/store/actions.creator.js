import * as actionTypes from './actions';

export const coachUpdateInfo = (data, callback) => ({
  type: actionTypes.COACH_UPDATE_INFO,
  payload: { data },
  callback,
});

export const coachUpdateInfoSuccess = () => ({
  type: actionTypes.COACH_UPDATE_INFO_SUCCESS,
});

export const coachUpdateInfoError = (payload) => ({
  type: actionTypes.COACH_UPDATE_INFO_ERROR,
  payload,
});
