import { all, put, takeLatest, call } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const REQUEST_CANCELLATION_SAGA = 'requestCancellationSaga';

export function* suggestTimeSlotWorker({ payload: { data }, callback }) {
  try {
    yield api.suggetTimeSlot(data);
    yield put(actionCreators.suggestTimeSlotSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.suggestTimeSlotError(err));
    yield call(callback, err);
  }
}

export function* cancelRequestWorker({ payload: { data }, callback }) {
  try {
    yield api.cancelRequest(data);
    yield put(actionCreators.cancelRequestSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.cancelRequestError(err));
    yield call(callback, err);
  }
}

export function* acceptSuggestionWorker({ payload: { data }, callback }) {
  try {
    yield api.acceptCoachSuggestion(data);
    yield put(actionCreators.acceptSuggestionSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.acceptRequestError(err));
    yield call(callback, err);
  }
}

function* cancelRequestSaga() {
  yield all([
    takeLatest(actionTypes.CANCEL_REQUEST, cancelRequestWorker),
    takeLatest(actionTypes.SUGGEST_TIME_SLOT, suggestTimeSlotWorker),
    takeLatest(actionTypes.ACCEPT_SUGGESTION, acceptSuggestionWorker),
  ]);
}

export default {
  key: REQUEST_CANCELLATION_SAGA,
  saga: cancelRequestSaga,
};
