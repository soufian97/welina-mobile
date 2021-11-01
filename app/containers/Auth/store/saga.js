import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const AUTH_SAGA = 'AuthSaga';

export function* registerWorker({ payload: { data }, callback }) {
  try {
    yield api.register(data);
    yield put(actionCreators.createAccountSuccess(data.email));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.createAccountError());
    yield call(callback, err);
  }
}

export function* phoneVerificationWorker({ payload: { data }, callback }) {
  try {
    yield api.verfiyPhone(data);
    yield put(actionCreators.verifyPhoneNumberSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.verifyPhoneNumberError());
    yield call(callback, err);
  }
}

export function* otpVerificationWorker({ payload: { data }, callback }) {
  try {
    yield api.verfiyOtp(data);
    yield put(actionCreators.verifyOTPSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.verifyOTPError());
    yield call(callback, err);
  }
}

export function* resetPasswordWorker({ payload: { data }, callback }) {
  try {
    yield api.resetPassword(data);
    yield put(actionCreators.resetPasswordSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.resetPasswordError(err));
    yield call(callback, err);
  }
}

export function* logoutUserWorker({ callback }) {
  try {
    yield api.logout();
    yield put(actionCreators.logoutUserSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.logoutUserError(err));
    yield call(callback, err);
  }
}

export function* checkCurrentWorker({ callback }) {
  try {
    const user = yield api.getCurrent();
    yield put(actionCreators.checkCurrentSuccess(user));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.checkCurrentError());
    yield call(callback, err);
  }
}
export function* disableAccountWorker({ callback }) {
  try {
    yield api.disableAccount();
    yield api.logout();
    yield put(actionCreators.disableAccountSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.disableAccountError());
    yield call(callback, err);
  }
}

export function* activateAccountWorker({ callback }) {
  try {
    yield api.activate();
    yield put(actionCreators.activateAccountSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.activateAccountError());
    yield call(callback, err);
  }
}

function* authSaga() {
  yield all([
    takeLatest(actionTypes.AUTH_REGISTER, registerWorker),
    takeLatest(actionTypes.AUTH_PHONE_VERIFICATION, phoneVerificationWorker),
    takeLatest(actionTypes.AUTH_OTP_VERIFICATION, otpVerificationWorker),
    takeLatest(actionTypes.AUTH_REST_PASSWORD, resetPasswordWorker),
    takeLatest(actionTypes.LOGOUT_USER, logoutUserWorker),
    takeLatest(actionTypes.CHECK_CURRENT, checkCurrentWorker),
    takeLatest(actionTypes.DISABLE_ACCOUNT, disableAccountWorker),
    takeLatest(actionTypes.ACTIVATE_ACCOUNT, activateAccountWorker),
  ]);
}

export default {
  key: AUTH_SAGA,
  saga: authSaga,
};
