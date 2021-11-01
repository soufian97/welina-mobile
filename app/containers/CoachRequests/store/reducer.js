import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const RECEIVED_REQUEST_REDUCER = 'receivedRequestReducer';

export const initialState = {
  requests: [],
  lastPage: false,
  isLoading: false,
  error: null,
  totalElements: 0,
};

const receivedRequestReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_RECEIVED_REQUEST: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_RECEIVED_REQUEST_SUCCESS: {
        draft.requests = payload.content;
        draft.lastPage = payload.last;
        draft.totalElements = payload.totalElements;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_RECEIVED_REQUEST_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: RECEIVED_REQUEST_REDUCER,
  reducer: receivedRequestReducer,
};
