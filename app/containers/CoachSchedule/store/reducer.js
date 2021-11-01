import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const COACH_SCHEDULE_REDUCER = 'coachScheduleReducer';

export const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

const coachScheduleReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.GET_EVENTS: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.GET_EVENTS_SUCCESS: {
        draft.events = payload;
        draft.isLoading = false;
        break;
      }
      case actionTypes.GET_EVENTS_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: COACH_SCHEDULE_REDUCER,
  reducer: coachScheduleReducer,
};
