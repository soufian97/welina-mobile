import produce from 'immer';
import * as actionsType from './actions';

export const ADD_OFFER_REDUCER = 'addOfferReducer';

export const initialState = {
  cities: [],
  skills: [],
  states: [],
  isLoading: false,
  offerToUpdate: {},
  error: null,
};

const addOfferReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionsType.GET_OFFER: {
        draft.isLoading = true;
        draft.offerToUpdate = {};
        break;
      }
      case actionsType.GET_STATES_CITIES:
      case actionsType.GET_STATES:
      case actionsType.GET_CITIES:
      case actionsType.ADD_OFFER:
      case actionsType.DELETE_OFFER:
      case actionsType.GET_SKILLS: {
        draft.isLoading = true;
        break;
      }
      case actionsType.GET_STATES_CITIES_SUCCESS:
      case actionsType.GET_CITIES_SUCCESS: {
        draft.cities = payload;
        draft.isLoading = false;
        break;
      }
      case actionsType.GET_STATES_SUCCESS: {
        draft.states = payload;
        draft.isLoading = false;
        break;
      }
      case actionsType.GET_SKILLS_SUCCESS: {
        draft.skills = payload;
        draft.isLoading = false;
        break;
      }
      case actionsType.DELETE_OFFER_SUCCESS:
      case actionsType.ADD_OFFER_SUCCESS: {
        draft.isLoading = false;
        draft.offerToUpdate = {};
        break;
      }
      case actionsType.GET_OFFER_SUCCESS: {
        draft.offerToUpdate = payload;
        draft.isLoading = false;
        break;
      }
      case actionsType.GET_STATES_CITIES_ERROR:
      case actionsType.GET_STATES_ERROR:
      case actionsType.DELETE_OFFER_ERROR:
      case actionsType.GET_OFFER_ERROR:
      case actionsType.ADD_OFFER_ERROR:
      case actionsType.GET_SKILLS_ERROR:
      case actionsType.GET_CITIES_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: ADD_OFFER_REDUCER,
  reducer: addOfferReducer,
};
