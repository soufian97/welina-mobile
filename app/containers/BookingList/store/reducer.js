import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const BOOKING_LIST_REDUCER = 'bookingListReducer';

export const initialState = {
  bookings: [],
  lastPage: false,
  isLoading: false,
  error: null,
};

const bookingListReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.CANCEL_BOOKING:
      case actionTypes.GET_BOOKING: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_BOOKING_SUCCESS: {
        draft.bookings = payload.content;
        draft.lastPage = payload.last;
        draft.isLoading = false;
        break;
      }

      case actionTypes.CANCEL_BOOKING_SUCCESS: {
        draft.bookings = draft.bookings.filter((item) => item.id !== payload);
        draft.isLoading = false;
        break;
      }
      case actionTypes.CANCEL_BOOKING_ERROR:
      case actionTypes.GET_BOOKING_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: BOOKING_LIST_REDUCER,
  reducer: bookingListReducer,
};
