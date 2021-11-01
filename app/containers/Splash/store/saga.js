import { all, put, takeLatest, call } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { get, save } from '../../../utils/storage/storage';

export const HOME_SAGA = 'homeSaga';

export function* signInWorker({ payload: { data }, callback }) {
  try {
    yield api.signIn(data);
    const user = yield api.getCurrent();
    yield put(actionCreators.signInSuccess(user));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.signInError());
    yield call(callback, err);
  }
}

export function* addBetaReviewWorker({ payload: { data }, callback }) {
  try {
    yield api.addBetaReview(data);
    yield put(actionCreators.addBetaReviewSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.addBetaReviewError(err));
    yield call(callback, err);
  }
}

export function* addBetaGeneralReviewWorker({ payload: { data }, callback }) {
  try {
    yield api.addBetaGeneralReview(data);
    yield put(actionCreators.addBetaGeneralReviewSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.addBetaGeneralReviewError(err));
    yield call(callback, err);
  }
}

export function* setDateToNextFeedbackWorker({ payload: { data }, callback }) {
  try {
    const { key, value } = data;
    yield save(key, value);
    yield put(actionCreators.setDateToShoWFeedBackModalSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.setDateToShoWFeedBackModalError());
    yield call(callback, err);
  }
}

export function* getDateToNextFeedbackWorker({ payload: { data }, callback }) {
  try {
    const { key } = data;
    const betaReminderDate = yield get(key);
    yield put(
      actionCreators.getDateToShoWFeedBackModalSuccess(betaReminderDate),
    );
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getDateToShoWFeedBackModalError());
    yield call(callback, err);
  }
}

function* homeSaga() {
  yield all([
    takeLatest(actionTypes.AUTH_SIGNIN, signInWorker),
    takeLatest(
      actionTypes.SET_DATE_TO_SHOW_FEEDBACK_MODAL,
      setDateToNextFeedbackWorker,
    ),
    takeLatest(
      actionTypes.GET_DATE_TO_SHOW_FEEDBACK_MODAL,
      getDateToNextFeedbackWorker,
    ),
    takeLatest(actionTypes.ADD_BETA_REVIEW, addBetaReviewWorker),
    takeLatest(actionTypes.ADD_BETA_GENERAL_REVIEW, addBetaGeneralReviewWorker),
  ]);
}

export default {
  key: HOME_SAGA,
  saga: homeSaga,
};
