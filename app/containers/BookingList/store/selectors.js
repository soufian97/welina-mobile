import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBookingList = (state) => state.bookingListReducer || initialState;

const getBookingListSelector = () =>
  createSelector(
    selectBookingList,
    (bookingListState) => bookingListState.bookings,
  );
const getIsLastPageSelector = () =>
  createSelector(
    selectBookingList,
    (bookingListState) => bookingListState.lastPage,
  );
const getBookingListLoaderSelector = () =>
  createSelector(
    selectBookingList,
    (bookingListState) => bookingListState.isLoading,
  );

export {
  selectBookingList,
  getBookingListSelector,
  getIsLastPageSelector,
  getBookingListLoaderSelector,
};
