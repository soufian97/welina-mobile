import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFilter = (state) => state.filterReducer || initialState;

const getSessionsAndPackagesSelector = () =>
  createSelector(
    selectFilter,
    (filterState) => filterState.packagesAndSessions,
  );
const getErrorSelector = () =>
  createSelector(selectFilter, (filterState) => filterState.error);

const getIsLoadingDiscoverSelector = () =>
  createSelector(selectFilter, (filterState) => filterState.isLoading);

const getIsLastPageSelector = () =>
  createSelector(selectFilter, (filterState) => filterState.lastPage);

export {
  getSessionsAndPackagesSelector,
  getIsLoadingDiscoverSelector,
  getErrorSelector,
  getIsLastPageSelector,
};
