import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const NOTIFICATIONS_REDUCER = 'notificationsReducer';

export const initialState = {
  notifications: [],
  lastPage: false,
  isLoading: false,
  error: null,
};

const notificationsReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_NOTIFICATIONS: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_NOTIFICATIONS_SUCCESS: {
        draft.notifications = payload.content;
        draft.lastPage = payload.last;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_NOTIFICATIONS_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: NOTIFICATIONS_REDUCER,
  reducer: notificationsReducer,
};
