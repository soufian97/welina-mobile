import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDiscover = (state) => state.discoverReducer || initialState;

const getAvailableSessionsSelector = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.availableSessions,
  );

const getRecentsSessionsSelector = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.recentSessions,
  );
const getErrorSelector = () =>
  createSelector(selectDiscover, (discoverState) => discoverState.error);

const getAvailablePackagesSelector = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.availablePackages,
  );

const getRecentPackagesSelector = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.recentPackages,
  );

const getIsLoadingDiscoverSelector = () =>
  createSelector(selectDiscover, (discoverState) => discoverState.isLoading);

const isLastAvailablePackagesPage = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.lastPageAvailablePackages,
  );

const isLastRecentPackagesPage = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.lastPageRecentPackages,
  );

const isLastRecentSessionsPage = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.lastPageRecentSessions,
  );

const isLastAvailableSessionsPage = () =>
  createSelector(
    selectDiscover,
    (discoverState) => discoverState.lastPageAvailableSessions,
  );

export {
  getAvailableSessionsSelector,
  getRecentsSessionsSelector,
  getAvailablePackagesSelector,
  getRecentPackagesSelector,
  getIsLoadingDiscoverSelector,
  getErrorSelector,
  isLastAvailableSessionsPage,
  isLastAvailablePackagesPage,
  isLastRecentPackagesPage,
  isLastRecentSessionsPage,
};
