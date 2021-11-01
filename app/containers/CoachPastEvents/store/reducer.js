import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const PAST_REQUEST_REDUCER = 'pastRequestReducer';

export const initialState = {
  pastRequests: [],
  lastPage: false,
  isLoading: false,
  error: null,
};

const pastRequestReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_PAST_REQUEST: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_PAST_REQUEST_SUCCESS: {
        draft.pastRequests = payload.content;
        draft.lastPage = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_PAST_REQUEST_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: PAST_REQUEST_REDUCER,
  reducer: pastRequestReducer,
};
