import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const MESSAGES_REDUCER = 'messagesReducer';

export const initialState = {
  token: null,
  channels: null,
  isLoading: false,
};

const messagesReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_CHANNELS:
      case actionTypes.GET_TOKEN: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_TOKEN_SUCCESS: {
        draft.token = payload.token;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_CHANNELS_ERROR:
      case actionTypes.GET_TOKEN_ERROR: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_TOKEN_SUCCESS: {
        draft.channels = payload;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: MESSAGES_REDUCER,
  reducer: messagesReducer,
};
