import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPastRequest = (state) => state.pastRequestReducer || initialState;

const getPastRequestSelector = () =>
  createSelector(
    selectPastRequest,
    (pastRequestsState) => pastRequestsState.pastRequests,
  );

const getIsLastPageSelector = () =>
  createSelector(
    selectPastRequest,
    (pastRequestsState) => pastRequestsState.lastPage,
  );
const getPastRequestLoaderSelector = () =>
  createSelector(
    selectPastRequest,
    (pastRequestsState) => pastRequestsState.isLoading,
  );

export {
  selectPastRequest,
  getPastRequestSelector,
  getIsLastPageSelector,
  getPastRequestLoaderSelector,
};
