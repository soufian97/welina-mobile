import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { PAGE_SIZE, PACKAGE, SESSION } from '../../../config/app.constant';
import {
  getAvailableSessionsSelector,
  getRecentsSessionsSelector,
  getAvailablePackagesSelector,
  getRecentPackagesSelector,
} from './selectors';

export const DISCOVER_SAGA = 'discoverSaga';

export function* getAvailableSessionsWorker({ payload: { data }, callback }) {
  try {
    const sessionParams = {
      size: PAGE_SIZE,
      sort: 'score,DESC',
      type: SESSION,
      ...data,
    };
    const availableSessionsResponse = yield api.getSessionsAndPackages(
      sessionParams,
    );

    if (data.page !== 0) {
      let previousAvailableSessions = yield select(
        getAvailableSessionsSelector(),
      );

      availableSessionsResponse.content = previousAvailableSessions.concat(
        availableSessionsResponse.content,
      );
    }

    yield put(
      actionCreators.getAvailableSessionsSuccess(availableSessionsResponse),
    );
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getAvailableSessionsError(err));
    yield call(callback, err);
  }
}

export function* getRecentSessionsWorker({ payload: { data }, callback }) {
  try {
    const sessionParams = {
      sort: 'createdAt,DESC',
      type: SESSION,
      size: PAGE_SIZE,
      ...data,
    };
    const recentSessionsResponse = yield api.getSessionsAndPackages(
      sessionParams,
    );
    if (data.page !== 0) {
      let previousRecentSessions = yield select(getRecentsSessionsSelector());
      recentSessionsResponse.content = previousRecentSessions.concat(
        recentSessionsResponse.content,
      );
    }

    yield put(actionCreators.getRecentSessionsSuccess(recentSessionsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getRecentSessionsError(err));
    yield call(callback, err);
  }
}

export function* getAvailablePackagesWorker({ payload: { data }, callback }) {
  try {
    const packageParams = {
      size: PAGE_SIZE,
      sort: 'score,DESC',
      type: PACKAGE,
      ...data,
    };
    const availablePackagesResponse = yield api.getSessionsAndPackages(
      packageParams,
    );
    if (data.page !== 0) {
      let previousAvailablePackages = yield select(
        getAvailablePackagesSelector(),
      );
      availablePackagesResponse.content = previousAvailablePackages.concat(
        availablePackagesResponse.content,
      );
    }

    yield put(
      actionCreators.getAvailablePackagesSuccess(availablePackagesResponse),
    );
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getAvailablePackagesError(err));
    yield call(callback, err);
  }
}

export function* getRecentPackagesWorker({ payload: { data }, callback }) {
  try {
    const packageParams = {
      sort: 'createdAt,DESC',
      type: PACKAGE,
      size: PAGE_SIZE,
      ...data,
    };
    const recentPackagesResponse = yield api.getSessionsAndPackages(
      packageParams,
    );
    if (data.page !== 0) {
      let previousRecentsPackages = yield select(getRecentPackagesSelector());
      recentPackagesResponse.content = previousRecentsPackages.concat(
        recentPackagesResponse.content,
      );
    }

    yield put(actionCreators.getRecentPackagesSuccess(recentPackagesResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getRecentPackagesError(err));
    yield call(callback, err);
  }
}

function* discoverSaga() {
  yield all([
    takeLatest(actionTypes.GET_AVAILABALE_SESSIONS, getAvailableSessionsWorker),
    takeLatest(actionTypes.GET_RECENT_SESSIONS, getRecentSessionsWorker),
    takeLatest(actionTypes.GET_AVAILABALE_PACKAGES, getAvailablePackagesWorker),
    takeLatest(actionTypes.GET_RECENT_PACKAGES, getRecentPackagesWorker),
  ]);
}

export default {
  key: DISCOVER_SAGA,
  saga: discoverSaga,
};
