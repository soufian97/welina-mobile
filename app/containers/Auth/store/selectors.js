import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuth = (state) => state.authReducer || initialState;

const getLoadingSelector = () =>
  createSelector(selectAuth, (authState) => authState.loading);

const getErrorSelector = () =>
  createSelector(selectAuth, (authState) => authState.error);

const getCurrentUser = () =>
  createSelector(selectAuth, (appState) => appState.user);

const getModalDisableVisibility = () =>
  createSelector(selectAuth, (appState) => appState.disableModalVisibility);

export {
  getLoadingSelector,
  getErrorSelector,
  getCurrentUser,
  getModalDisableVisibility,
};
