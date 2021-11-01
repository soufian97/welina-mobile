import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

import { PAGE_SIZE } from '../../../config/app.constant';
import { getReviewsSelector, getOffersSelector } from './selectors';

export const COACH_DETAILS_SAGA = 'coachDetailsSaga';

export function* getImagesWorker({ payload: { data }, callback }) {
  try {
    const imagesResponse = yield api.getImages(data.coachId);
    yield put(actionCreators.getImagesSuccess(imagesResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getImagesError(err));
    yield call(callback, err);
  }
}

export function* getDescriptionWorker({ payload: { data }, callback }) {
  try {
    const descriptionsResponse = yield api.getDescription(data.coachId);
    yield put(actionCreators.getDescriptionSuccess(descriptionsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getDescriptionError(err));
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

export function* getOffersWorker({ payload: { data }, callback }) {
  try {
    let { id } = data;
    const params = {
      size: PAGE_SIZE,
      page: data?.page,
    };

    const offersResponse = yield api.getOffers(id, params);
    if (data.page !== 0) {
      let previousOffers = yield select(getOffersSelector());
      offersResponse.content = previousOffers.content.concat(
        offersResponse.content,
      );
    }
    yield put(actionCreators.getOffersSuccess(offersResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getOffersError(err));
    yield call(callback, err);
  }
}

function* coachDetailsSaga() {
  yield all([
    takeLatest(actionTypes.GET_IMAGES, getImagesWorker),
    takeLatest(actionTypes.GET_DESCRIPTION, getDescriptionWorker),
    takeLatest(actionTypes.GET_REVIEWS, getReviewsWorker),
    takeLatest(actionTypes.GET_OFFERS, getOffersWorker),
  ]);
}

export default {
  key: COACH_DETAILS_SAGA,
  saga: coachDetailsSaga,
};
