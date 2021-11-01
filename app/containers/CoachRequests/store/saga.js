import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { PAGE_SIZE } from '../../../config/app.constant';
import { getReceivedRequestSelector } from './selectors';

export const RECEIVED_REQUEST_SAGA = 'receivedRequestSaga';

export function* getReceivedRequestWorker({ payload: { data }, callback }) {
  try {
    const receivedRequestParams = {
      ...data,
      size: PAGE_SIZE,
      sort: 'reservationDate,ASC',
    };
    const receivedRequestResponse = yield api.getRecivedRequest(
      receivedRequestParams,
    );
    if (data.page !== 0) {
      let previousReceivedRequest = yield select(getReceivedRequestSelector());
      receivedRequestResponse.content = previousReceivedRequest.concat(
        receivedRequestResponse.content,
      );
    }
    yield put(
      actionCreators.getReceivedRequestListSuccess(receivedRequestResponse),
    );
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getReceivedRequestListError(err));
    yield call(callback, err);
  }
}

function* receivedRequestSaga() {
  yield all([
    takeLatest(actionTypes.GET_RECEIVED_REQUEST, getReceivedRequestWorker),
  ]);
}

export default {
  key: RECEIVED_REQUEST_SAGA,
  saga: receivedRequestSaga,
};
