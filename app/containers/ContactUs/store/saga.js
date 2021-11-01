import { all, put, takeLatest, call } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const CONTACT_US_SAGA = 'contactUsSaga';

export function* sendEmailWorker({ payload: { data }, callback }) {
  try {
    yield api.contactUs(data);
    yield put(actionCreators.postEmailSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.postEmailError(err));
    yield call(callback, err);
  }
}

function* contactUsSaga() {
  yield all([takeLatest(actionTypes.POST_EMAIL, sendEmailWorker)]);
}

export default {
  key: CONTACT_US_SAGA,
  saga: contactUsSaga,
};
