import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRequestSession = (state) =>
  state.requestSessionReducer || initialState;

const getErrorSelector = () =>
  createSelector(
    selectRequestSession,
    (requestSessionState) => requestSessionState.error,
  );

const getRequestSessionLoaderSelector = () =>
  createSelector(
    selectRequestSession,
    (requestSessionState) => requestSessionState.isLoading,
  );
export { getErrorSelector, getRequestSessionLoaderSelector };
