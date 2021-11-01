import { all, put, takeLatest, call } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const DETAILS_SAGA = 'detailsSaga';

export function* getSessionDetailsWorker({ payload: { data }, callback }) {
  try {
    const recentSessionsResponse = yield api.getSessionDetails(data);
    yield put(actionCreators.getSessionDetailsSuccess(recentSessionsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getSessionDetailsError(err));
    yield call(callback, err);
  }
}

export function* getPackageDetailsWorker({ payload: { data }, callback }) {
  try {
    const recentPackagesResponse = yield api.getPackageDetails(data);
    yield put(actionCreators.getPackageDetailsSuccess(recentPackagesResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getPackageDetailsError(err));
    yield call(callback, err);
  }
}

function* detailsSaga() {
  yield all([
    takeLatest(actionTypes.GET_SESSION_DETAILS, getSessionDetailsWorker),
    takeLatest(actionTypes.GET_PACKAGE_DETAILS, getPackageDetailsWorker),
  ]);
}

export default {
  key: DETAILS_SAGA,
  saga: detailsSaga,
};
