import { all, put, takeLatest, call } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const REQUEST_DETAILS_SAGA = 'requestDetailsSaga';

export function* getRequestDetailsWorker({ payload: { data }, callback }) {
  try {
    const requestDetailsResponse = yield api.getRecivedRequestDetails(data);
    yield put(actionCreators.getRequestDetailsSuccess(requestDetailsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getRequestDetailsError(err));
    yield call(callback, err);
  }
}

export function* acceptRequestWorker({ payload: { data }, callback }) {
  try {
    yield api.acceptRequest(data);
    yield put(actionCreators.acceptRequestSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.acceptRequestError(err));
    yield call(callback, err);
  }
}

function* requestDetailsSaga() {
  yield all([
    takeLatest(actionTypes.GET_REQUEST_DETAILS, getRequestDetailsWorker),
    takeLatest(actionTypes.ACCEPT_REQUEST, acceptRequestWorker),
  ]);
}

export default {
  key: REQUEST_DETAILS_SAGA,
  saga: requestDetailsSaga,
};
