import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { PAGE_SIZE } from '../../../config/app.constant';
import { getPastRequestSelector } from './selectors';

export const PAST_REQUEST_SAGA = 'pastRequestSaga';

export function* getPastRequestWorker({ payload: { data }, callback }) {
  try {
    const pastRequestParams = {
      ...data,
      size: PAGE_SIZE,
    };
    const pastRequestResponse = yield api.getPastRequest(pastRequestParams);
    if (data.page !== 0) {
      let previousRecivedRequest = yield select(getPastRequestSelector());
      pastRequestResponse.content = previousRecivedRequest.concat(
        pastRequestResponse.content,
      );
    }
    yield put(actionCreators.getPastRequestListSuccess(pastRequestResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getPastRequestListError(err));
    yield call(callback, err);
  }
}

function* pastRequestSaga() {
  yield all([takeLatest(actionTypes.GET_PAST_REQUEST, getPastRequestWorker)]);
}

export default {
  key: PAST_REQUEST_SAGA,
  saga: pastRequestSaga,
};
