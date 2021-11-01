import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';

export const COACH_SCHEDULE_SAGA = 'coachScheduleSaga';

export function* getEventsWorker({ payload: { data }, callback }) {
  const queryParam = {
    reservationDate: data,
  };
  try {
    const eventsResponse = yield api.getEvents(queryParam);
    yield put(actionCreators.getEventsSuccess(eventsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getEventsError(err));
    yield call(callback, err);
  }
}
function* coachScheduleSaga() {
  yield all([takeLatest(actionTypes.GET_EVENTS, getEventsWorker)]);
}

export default {
  key: COACH_SCHEDULE_SAGA,
  saga: coachScheduleSaga,
};
