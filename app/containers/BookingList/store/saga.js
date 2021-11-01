import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { PAGE_SIZE } from '../../../config/app.constant';
import { getBookingListSelector } from './selectors';

export const BOOKING_LIST_SAGA = 'bookingListSaga';

export function* getBookingListWorker({ payload: { data }, callback }) {
  try {
    const bookingParams = {
      ...data,
      size: PAGE_SIZE,
      sort: 'reservationDate,ASC',
    };

    const bookingListResponse = yield api.getBookingList(bookingParams);

    if (data.page !== 0) {
      let previousBookingList = yield select(getBookingListSelector());

      bookingListResponse.content = previousBookingList.concat(
        bookingListResponse.content,
      );
    }

    yield put(actionCreators.getBookingListSuccess(bookingListResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getBookingListError(err));
    yield call(callback, err);
  }
}

export function* cancelationWorker({ payload: { data }, callback }) {
  try {
    yield api.cancelBooking(data);
    yield put(actionCreators.cancelBookingListSuccess(data));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.cancelBookingListError(err));
    yield call(callback, err);
  }
}

function* bookingListSaga() {
  yield all([
    takeLatest(actionTypes.GET_BOOKING, getBookingListWorker),
    takeLatest(actionTypes.CANCEL_BOOKING, cancelationWorker),
  ]);
}

export default {
  key: BOOKING_LIST_SAGA,
  saga: bookingListSaga,
};
