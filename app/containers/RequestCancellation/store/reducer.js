import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const REQUEST_CANCELLATION_REDUCER = 'requestCancellationReducer';

export const initialState = {
  isLoading: false,
  error: null,
};

const requestCancellationReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.ACCEPT_SUGGESTION:
      case actionTypes.SUGGEST_TIME_SLOT:
      case actionTypes.CANCEL_REQUEST: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.ACCEPT_SUGGESTION_SUCCESS:
      case actionTypes.SUGGEST_TIME_SLOT_SUCCESS:
      case actionTypes.CANCEL_REQUEST_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.ACCEPT_SUGGESTION_ERROR:
      case actionTypes.SUGGEST_TIME_SLOT_ERROR:
      case actionTypes.CANCEL_REQUEST_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: REQUEST_CANCELLATION_REDUCER,
  reducer: requestCancellationReducer,
};
