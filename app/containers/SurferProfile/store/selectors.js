import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSurferProfile = (state) =>
  state.surferProfileReducer || initialState;

const getSurferInfoSelector = () =>
  createSelector(
    selectSurferProfile,
    (surferProfileState) => surferProfileState.surferInfo,
  );

const getReviewsSelector = () =>
  createSelector(
    selectSurferProfile,
    (surferProfileState) => surferProfileState.reviews,
  );

const getIsLastReviewsPage = () =>
  createSelector(
    selectSurferProfile,
    (surferProfileState) => surferProfileState.reviewsLastPage,
  );

const getLoadingSelector = () =>
  createSelector(
    selectSurferProfile,
    (surferProfileState) => surferProfileState.isLoading,
  );

export {
  getSurferInfoSelector,
  getReviewsSelector,
  getIsLastReviewsPage,
  getLoadingSelector,
};
