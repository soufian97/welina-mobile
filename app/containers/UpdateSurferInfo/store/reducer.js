import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const UPDATE_INFO_REDUCER = 'updateInfoReducer';

export const initialState = {
  isLoading: false,
  error: null,
};

const updateInfoReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.UPDATE_INFO: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.UPDATE_INFO_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.UPDATE_INFO_ERROR: {
        draft.error = payload;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: UPDATE_INFO_REDUCER,
  reducer: updateInfoReducer,
};
