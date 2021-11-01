import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const SURFER_PROFILE_REDUCER = 'surferProfileReducer';

export const initialState = {
  surferInfo: {},
  reviews: [],
  reviewsLastPage: false,
  isLoading: false,
  error: null,
};

const surferProfileReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_REVIEWS:
      case actionTypes.GET_SURFER_INFO:
      case actionTypes.GET_DESCRIPTION: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_SURFER_INFO_SUCCESS: {
        draft.surferInfo = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_REVIEWS_SUCCESS: {
        draft.reviews = payload;
        draft.reviewsLastPage = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_REVIEWS_ERROR:
      case actionTypes.GET_DESCRIPTION_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: SURFER_PROFILE_REDUCER,
  reducer: surferProfileReducer,
};
