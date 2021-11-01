import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { PAGE_SIZE } from '../../../config/app.constant';

export const FILTER_SAGA = 'filterSaga';

export function* getSessionsAndPackagesWorker({ payload: { data }, callback }) {
  try {
    const offersParams = {
      ...data,
      size: PAGE_SIZE,
    };
    const sessionsAndPackagesResponse = yield api.getSessionsAndPackages(
      offersParams,
    );
    yield put(
      actionCreators.getPackagesByFiltersSuccess(sessionsAndPackagesResponse),
    );
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getPackagesByFiltersError(err));
    yield call(callback, err);
  }
}

function* filterSaga() {
  yield all([
    takeLatest(
      actionTypes.GET_PACKAGES_BY_FILTERS,
      getSessionsAndPackagesWorker,
    ),
  ]);
}

export default {
  key: FILTER_SAGA,
  saga: filterSaga,
};
