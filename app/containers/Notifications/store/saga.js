import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { PAGE_SIZE } from '../../../config/app.constant';
import { getNotificationsSelector } from './selectors';

export const NOTIFICATIONS_SAGA = 'notificationsSaga';

export function* getNotificationsWorker({ payload: { data }, callback }) {
  try {
    const notificationsParams = {
      ...data,
      size: PAGE_SIZE,
    };
    const notificationsResponse = yield api.getNotifications(
      notificationsParams,
    );

    if (data.page !== 0) {
      let previousBookingList = yield select(getNotificationsSelector());

      notificationsResponse.content = previousBookingList.concat(
        notificationsResponse.content,
      );
    }

    yield put(actionCreators.getNotificationsSuccess(notificationsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getNotificationsError(err));
    yield call(callback, err);
  }
}

function* notificationsSaga() {
  yield all([
    takeLatest(actionTypes.GET_NOTIFICATIONS, getNotificationsWorker),
  ]);
}

export default {
  key: NOTIFICATIONS_SAGA,
  saga: notificationsSaga,
};
