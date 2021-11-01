import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const DISCUSSION_SAGA = 'discussionSaga';

export function* getTokenWorker({ callback }) {
  try {
    const tokenResponse = yield api.getToken();
    yield put(actionCreators.getTokenSuccess(tokenResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getTokenError(err));
    yield call(callback, err);
  }
}

export function* sendSmsWorker({ payload: { data }, callback }) {
  try {
    const { id, user } = data;
    const sendSmsResponse = yield api.sendSms(id, { user });
    yield put(actionCreators.sendSmsSuccess(sendSmsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.sendSmsError(err));
    yield call(callback, err);
  }
}

function* discussionSaga() {
  yield all([takeLatest(actionTypes.GET_TOKEN, getTokenWorker)]);
  yield all([takeLatest(actionTypes.SEND_SMS, sendSmsWorker)]);
}

export default {
  key: DISCUSSION_SAGA,
  saga: discussionSaga,
};
