import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRequestCancellation = (state) =>
  state.requestCancellationReducer || initialState;

const getRequestCancellationLoaderSelector = () =>
  createSelector(
    selectRequestCancellation,
    (cancellationState) => cancellationState.isLoading,
  );

export { getRequestCancellationLoaderSelector };
