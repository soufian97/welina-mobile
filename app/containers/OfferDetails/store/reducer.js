import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const DETAILS_REDUCER = 'detailsReducer';

export const initialState = {
  sessionDetails: {},
  packageDetails: {},
  isLoading: false,
  error: null,
};

const detailsReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_SESSION_DETAILS: {
        draft.sessionDetails = {};
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_PACKAGE_DETAILS: {
        draft.packageDetails = {};
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_SESSION_DETAILS_SUCCESS: {
        draft.sessionDetails = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_PACKAGE_DETAILS_SUCCESS: {
        draft.packageDetails = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_PACKAGE_DETAILS_ERROR:
      case actionTypes.GET_SESSION_DETAILS_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: DETAILS_REDUCER,
  reducer: detailsReducer,
};
