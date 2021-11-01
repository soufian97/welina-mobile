import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const BASIC_INFO_REDUCER = 'basicInfoReducer';

export const initialState = {
  languages: [],
  isLoading: false,
  error: null,
};

const basicInfoReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.SET_BASIC_INFO:
      case actionTypes.GET_LANGUAGES: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_LANGUAGES_SUCCESS: {
        draft.languages = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.SET_BASIC_INFO_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.SET_BASIC_INFO_ERROR:
      case actionTypes.GET_LANGUAGES_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: BASIC_INFO_REDUCER,
  reducer: basicInfoReducer,
};
