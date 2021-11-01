import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const REQUEST_SESSION_REDUCER = 'requestSessionReducer';

export const initialState = {
  isLoading: false,
  error: null,
};

const requestSessionReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.BOOK_OFFER: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.BOOK_OFFER_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.BOOK_OFFER_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: REQUEST_SESSION_REDUCER,
  reducer: requestSessionReducer,
};
