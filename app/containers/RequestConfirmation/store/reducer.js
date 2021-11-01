import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const REQUEST_DETAILS_REDUCER = 'requestDetailsReducer';

export const initialState = {
  requestDetails: {},
  isLoading: false,
  error: null,
};

const requestDetailsReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.ACCEPT_REQUEST:
      case actionTypes.GET_REQUEST_DETAILS: {
        draft.requestDetails = {};
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_REQUEST_DETAILS_SUCCESS: {
        draft.requestDetails = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.ACCEPT_REQUEST_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.ACCEPT_REQUEST_ERROR:
      case actionTypes.GET_REQUEST_DETAILS_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: REQUEST_DETAILS_REDUCER,
  reducer: requestDetailsReducer,
};
