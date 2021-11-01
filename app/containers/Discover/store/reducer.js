import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const DISCOVER_REDUCER = 'discoverReducer';

export const initialState = {
  availablePackages: [],
  recentPackages: [],
  recentSessions: [],
  availableSessions: [],
  lastPageAvailableSessions: false,
  lastPageAvailablePackages: false,
  lastPageRecentPackages: false,
  lastPageRecentSessions: false,
  isLoading: false,
  error: null,
};

const discoverReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_AVAILABALE_PACKAGES:
      case actionTypes.GET_RECENT_PACKAGES:
      case actionTypes.GET_AVAILABALE_SESSIONS:
      case actionTypes.GET_RECENT_SESSIONS: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_AVAILABALE_PACKAGES_SUCCESS: {
        draft.availablePackages = payload.content;
        draft.lastPageAvailablePackages = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_RECENT_PACKAGES_SUCCESS: {
        draft.recentPackages = payload.content;
        draft.lastPageRecentPackages = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_AVAILABALE_SESSIONS_SUCCESS: {
        draft.availableSessions = payload.content;
        draft.lastPageAvailableSessions = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_RECENT_SESSIONS_SUCCESS: {
        draft.recentSessions = payload.content;
        draft.lastPageRecentSessions = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_AVAILABALE_PACKAGES_ERROR:
      case actionTypes.GET_AVAILABALE_SESSIONS_ERROR:
      case actionTypes.GET_RECENT_PACKAGES_ERROR:
      case actionTypes.GET_RECENT_SESSIONS_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: DISCOVER_REDUCER,
  reducer: discoverReducer,
};
