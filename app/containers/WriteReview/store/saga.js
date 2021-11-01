import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const WRITE_REVIEW_SAGA = 'writeReviewSaga';

export function* addReviewWorker({ payload: { data }, callback }) {
  try {
    yield api.addReview(data);
    yield put(actionCreators.addReviewSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.addReviewError(err));
    yield call(callback, err);
  }
}
function* writeReviewSaga() {
  yield all([takeLatest(actionTypes.ADD_REVIEW, addReviewWorker)]);
}

export default {
  key: WRITE_REVIEW_SAGA,
  saga: writeReviewSaga,
};
