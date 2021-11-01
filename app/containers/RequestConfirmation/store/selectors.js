import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRequestDetails = (state) =>
  state.requestDetailsReducer || initialState;

const getRequestDetailsSelector = () =>
  createSelector(
    selectRequestDetails,
    (detailsState) => detailsState.requestDetails,
  );

const getRequestDetailsLoaderSelector = () =>
  createSelector(
    selectRequestDetails,
    (detailsState) => detailsState.isLoading,
  );

export { getRequestDetailsSelector, getRequestDetailsLoaderSelector };
