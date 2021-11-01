import * as actionTypes from './actions';

export const getLanguages = (callback) => ({
  type: actionTypes.GET_LANGUAGES,
  callback,
});

export const getLanguagesSuccess = (payload) => ({
  type: actionTypes.GET_LANGUAGES_SUCCESS,
  payload,
});

export const getLanguagesError = (payload) => ({
  type: actionTypes.GET_LANGUAGES_ERROR,
  payload,
});

export const setBasicInfo = (data, callback) => ({
  type: actionTypes.SET_BASIC_INFO,
  payload: {
    data: data,
  },
  callback,
});

export const setBasicInfoSuccess = () => ({
  type: actionTypes.SET_BASIC_INFO_SUCCESS,
});

export const setBasicInfoError = (payload) => ({
  type: actionTypes.SET_BASIC_INFO_ERROR,
  payload,
});
