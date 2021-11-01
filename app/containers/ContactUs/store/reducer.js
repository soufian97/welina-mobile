import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const CONTACT_US_REDUCER = 'contactUsReducer';

export const initialState = {
  isLoading: false,
  error: null,
};

const contactUsReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.POST_EMAIL: {
        draft.isLoading = true;
        break;
      }
      case actionTypes.POST_EMAIL_SUCCESS: {
        draft.isLoading = false;
        break;
      }
      case actionTypes.POST_EMAIL_ERROR: {
        draft.error = payload.response;
        draft.isLoading = false;
        break;
      }
    }
  });

export default {
  key: CONTACT_US_REDUCER,
  reducer: contactUsReducer,
};
