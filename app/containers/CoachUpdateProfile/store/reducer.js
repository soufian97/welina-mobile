import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const COACH_UPDATE_INFO_REDUCER = 'coachUpdateInfoReducer';

export const initialState = {
  isLoading: false,
  error: null,
};

const coachUpdateInfoReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.COACH_UPDATE_INFO: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.COACH_UPDATE_INFO_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.COACH_UPDATE_INFO_ERROR: {
        draft.error = payload;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: COACH_UPDATE_INFO_REDUCER,
  reducer: coachUpdateInfoReducer,
};
