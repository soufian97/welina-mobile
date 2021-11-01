import * as actionTypes from './actions';

export const getCities = (data, callback) => ({
  type: actionTypes.GET_CITIES,
  payload: {
    data: data,
  },
  callback,
});

export const getCitiesSuccess = (payload) => ({
  type: actionTypes.GET_CITIES_SUCCESS,
  payload,
});

export const getCitiesError = (payload) => ({
  type: actionTypes.GET_CITIES_ERROR,
  payload,
});

export const getSkills = (callback) => ({
  type: actionTypes.GET_SKILLS,
  callback,
});

export const getSkillsSuccess = (payload) => ({
  type: actionTypes.GET_SKILLS_SUCCESS,
  payload,
});

export const getSkillsError = (payload) => ({
  type: actionTypes.GET_SKILLS_ERROR,
  payload,
});

export const addOffer = (data, callback) => ({
  type: actionTypes.ADD_OFFER,
  payload: {
    data: data,
  },
  callback,
});

export const addOfferSuccess = () => ({
  type: actionTypes.ADD_OFFER_SUCCESS,
});

export const addOfferError = (payload) => ({
  type: actionTypes.ADD_OFFER_ERROR,
  payload,
});

export const getOffer = (data, callback) => ({
  type: actionTypes.GET_OFFER,
  payload: {
    data: data,
  },
  callback,
});

export const getOfferSuccess = (payload) => ({
  type: actionTypes.GET_OFFER_SUCCESS,
  payload,
});

export const getOfferError = (payload) => ({
  type: actionTypes.GET_OFFER_ERROR,
  payload,
});

export const deleteOffer = (data, callback) => ({
  type: actionTypes.DELETE_OFFER,
  payload: {
    data: data,
  },
  callback,
});

export const deleteOfferSuccess = () => ({
  type: actionTypes.DELETE_OFFER_SUCCESS,
});

export const deleteOfferError = (payload) => ({
  type: actionTypes.DELETE_OFFER_ERROR,
  payload,
});

export const getStates = (data, callback) => ({
  type: actionTypes.GET_STATES,
  payload: {
    data: data,
  },
  callback,
});

export const getStatesSuccess = (payload) => ({
  type: actionTypes.GET_STATES_SUCCESS,
  payload,
});

export const getStatesError = (payload) => ({
  type: actionTypes.GET_STATES_ERROR,
  payload,
});

export const getStateCities = (data, callback) => ({
  type: actionTypes.GET_STATES_CITIES,
  payload: {
    data: data,
  },
  callback,
});

export const getStateCitiesSuccess = (payload) => ({
  type: actionTypes.GET_STATES_CITIES_SUCCESS,
  payload,
});

export const getStateCitiesError = (payload) => ({
  type: actionTypes.GET_STATES_CITIES_ERROR,
  payload,
});
