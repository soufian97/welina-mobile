import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDetails = (state) => state.detailsReducer || initialState;

const getSessionDetailsSelector = () =>
  createSelector(selectDetails, (detailsState) => detailsState.sessionDetails);

const getPackageDetailsSelector = () =>
  createSelector(selectDetails, (detailsState) => detailsState.packageDetails);

const getLoadingSelector = () =>
  createSelector(selectDetails, (detailsState) => detailsState.isLoading);

export {
  getSessionDetailsSelector,
  getPackageDetailsSelector,
  getLoadingSelector,
};
