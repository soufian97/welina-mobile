import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const COACH_DETAILS_REDUCER = 'coachDetailsReducer';

export const initialState = {
  images: [],
  description: {},
  reviews: [],
  offers: [],
  reviewsLastPage: false,
  offersLastPage: false,
  isLoading: false,
  error: null,
};

const coachDetailsReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_DESCRIPTION: {
        draft.isLoading = true;
        draft.description = {};
        break;
      }
      case actionTypes.GET_OFFERS:
      case actionTypes.GET_REVIEWS:
      case actionTypes.GET_IMAGES: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_IMAGES_SUCCESS: {
        draft.images = payload.gallery;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_DESCRIPTION_SUCCESS: {
        draft.description = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_REVIEWS_SUCCESS: {
        draft.reviews = payload;
        draft.reviewsLastPage = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_OFFERS_SUCCESS: {
        draft.offers = payload.content;
        draft.offersLastPage = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_OFFERS_ERROR:
      case actionTypes.GET_REVIEWS_ERROR:
      case actionTypes.GET_DESCRIPTION_ERROR:
      case actionTypes.GET_IMAGES_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: COACH_DETAILS_REDUCER,
  reducer: coachDetailsReducer,
};
