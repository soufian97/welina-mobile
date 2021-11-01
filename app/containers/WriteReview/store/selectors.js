import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectwriteReview = (state) => state.writeReviewReducer || initialState;

const getLoadingStateSelector = () =>
  createSelector(
    selectwriteReview,
    (writeReviewState) => writeReviewState.isLoading,
  );

export { getLoadingStateSelector };
