import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNotifications = (state) =>
  state.notificationsReducer || initialState;

const getNotificationsSelector = () =>
  createSelector(
    selectNotifications,
    (bookingListState) => bookingListState.notifications,
  );
const getIsLastPageSelector = () =>
  createSelector(
    selectNotifications,
    (bookingListState) => bookingListState.lastPage,
  );
const getNotificationsLoaderSelector = () =>
  createSelector(
    selectNotifications,
    (bookingListState) => bookingListState.isLoading,
  );

export {
  selectNotifications,
  getNotificationsSelector,
  getIsLastPageSelector,
  getNotificationsLoaderSelector,
};
