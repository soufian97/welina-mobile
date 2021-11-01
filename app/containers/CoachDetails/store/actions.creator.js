import * as actionTypes from './actions';

export const getImages = (data, callback) => ({
  type: actionTypes.GET_IMAGES,
  payload: {
    data: data,
  },
  callback,
});

export const getImagesSuccess = (payload) => ({
  type: actionTypes.GET_IMAGES_SUCCESS,
  payload,
});

export const getImagesError = (payload) => ({
  type: actionTypes.GET_IMAGES_ERROR,
  payload,
});

export const getDescription = (data, callback) => ({
  type: actionTypes.GET_DESCRIPTION,
  payload: {
    data: data,
  },
  callback,
});

export const getDescriptionSuccess = (payload) => ({
  type: actionTypes.GET_DESCRIPTION_SUCCESS,
  payload,
});

export const getDescriptionError = (payload) => ({
  type: actionTypes.GET_DESCRIPTION_ERROR,
  payload,
});

export const getReviews = (data, callback) => ({
  type: actionTypes.GET_REVIEWS,
  payload: {
    data: data,
  },
  callback,
});

export const getReviewsSuccess = (payload) => ({
  type: actionTypes.GET_REVIEWS_SUCCESS,
  payload,
});

export const getReviewsError = (payload) => ({
  type: actionTypes.GET_REVIEWS_ERROR,
  payload,
});

export const getOffers = (data, callback) => ({
  type: actionTypes.GET_OFFERS,
  payload: {
    data: data,
  },
  callback,
});

export const getOffersSuccess = (payload) => ({
  type: actionTypes.GET_OFFERS_SUCCESS,
  payload,
});

export const getOffersError = (payload) => ({
  type: actionTypes.GET_OFFERS_ERROR,
  payload,
});
