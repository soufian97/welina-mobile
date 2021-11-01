import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const FILTER_REDUCER = 'filterReducer';

export const initialState = {
  packagesAndSessions: [],
  isLoading: false,
  error: null,
  lastPage: false,
};

const filterReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_PACKAGES_BY_FILTERS: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_PACKAGES_BY_FILTERS_SUCCESS: {
        draft.packagesAndSessions = payload.content;
        draft.lastPage = payload.last;
        draft.isLoading = false;
        draft.error = null;
        break;
      }
      case actionTypes.GET_PACKAGES_BY_FILTERS_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: FILTER_REDUCER,
  reducer: filterReducer,
};
