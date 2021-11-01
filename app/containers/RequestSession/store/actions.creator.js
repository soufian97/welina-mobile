import * as actionTypes from './actions';

export const bookOffer = (data, callback) => ({
  type: actionTypes.BOOK_OFFER,
  payload: {
    data: { ...data },
  },
  callback,
});

export const bookOfferSuccess = (payload) => ({
  type: actionTypes.BOOK_OFFER_SUCCESS,
  payload,
});

export const bookOfferError = (payload) => ({
  type: actionTypes.BOOK_OFFER_ERROR,
  payload,
});
