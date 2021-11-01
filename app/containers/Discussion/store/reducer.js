import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const DISCUSSION_REDUCER = 'discussionReducer';

export const initialState = {
  token: null,
  isLoading: false,
};

const discussionReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_TOKEN: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_TOKEN_SUCCESS: {
        draft.token = payload.token;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_TOKEN_ERROR: {
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: DISCUSSION_REDUCER,
  reducer: discussionReducer,
};
