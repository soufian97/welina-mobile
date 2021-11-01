import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

import { PAGE_SIZE } from '../../../config/app.constant';
import { getReviewsSelector } from './selectors';

export const SURFER_PROFILE_SAGA = 'surferProfileSaga';

export function* getSurferInfoWorker({ payload: { data }, callback }) {
  try {
    const surferInfoResponse = yield api.getUserInfo(data);
    yield put(actionCreators.getSurferInfoSuccess(surferInfoResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getSurferInfoError(err));
    yield call(callback, err);
  }
}
export function* getReviewsWorker({ payload: { data }, callback }) {
  try {
    let { id } = data;
    const params = {
      size: PAGE_SIZE,
      page: data?.page,
    };

    const reviewsResponse = yield api.getUserReviews(id, params);
    if (data.page !== 0) {
      let previousReviews = yield select(getReviewsSelector());
      reviewsResponse.content = previousReviews.content.concat(
        reviewsResponse.content,
      );
    }
    yield put(actionCreators.getReviewsSuccess(reviewsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getReviewsError(err));
    yield call(callback, err);
  }
}
function* surferProfileSaga() {
  yield all([
    takeLatest(actionTypes.GET_SURFER_INFO, getSurferInfoWorker),
    takeLatest(actionTypes.GET_REVIEWS, getReviewsWorker),
  ]);
}

export default {
  key: SURFER_PROFILE_SAGA,
  saga: surferProfileSaga,
};
