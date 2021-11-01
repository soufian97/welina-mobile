import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const MESSAGES_SAGA = 'messagesSaga';

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

export function* getChannelsWorker({ callback }) {
  try {
    const channelsResponse = yield api.getChannels();
    yield put(actionCreators.getChannelsSuccess(channelsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getChannelsError(err));
    yield call(callback, err);
  }
}

function* messagesSaga() {
  yield all([takeLatest(actionTypes.GET_TOKEN, getTokenWorker)]);
  yield all([takeLatest(actionTypes.GET_CHANNELS, getChannelsWorker)]);
}

export default {
  key: MESSAGES_SAGA,
  saga: messagesSaga,
};
