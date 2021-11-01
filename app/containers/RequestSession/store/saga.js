import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const REQUEST_SESSION_SAGA = 'requestSessionSaga';

export function* bookOfferWorker({ payload: { data }, callback }) {
  try {
    const bookOfferResponse = yield api.bookOffer(data);
    yield put(actionCreators.bookOfferSuccess(bookOfferResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.bookOfferError(err));
    yield call(callback, err);
  }
}

function* requestSessionSaga() {
  yield all([takeLatest(actionTypes.BOOK_OFFER, bookOfferWorker)]);
}

export default {
  key: REQUEST_SESSION_SAGA,
  saga: requestSessionSaga,
};
