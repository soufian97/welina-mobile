import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const WRITE_REVIEW = 'writeReviewReducer';

export const initialState = {
  isLoading: false,
  error: null,
};

const writeReviewReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.ADD_REVIEW: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.ADD_REVIEW_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.ADD_REVIEW_ERROR: {
        draft.error = payload?.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: WRITE_REVIEW,
  reducer: writeReviewReducer,
};
