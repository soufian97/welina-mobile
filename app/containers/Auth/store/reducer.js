import produce, { enableES5 } from 'immer';
import * as actionTypes from './actions';
enableES5();

export const AUTH_REDUCER = 'authReducer';

export const initialState = {
  loading: false,
  user: null,
  error: {},
  disableModalVisibility: false,
};

const authReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actionTypes.AUTH_REST_PASSWORD:
      case actionTypes.AUTH_PHONE_VERIFICATION:
      case actionTypes.AUTH_OTP_VERIFICATION:
      case actionTypes.AUTH_REGISTER:
      case actionTypes.LOGOUT_USER: {
        draft.loading = true;
        break;
      }
      case actionTypes.OPEN_MODAL_ACCOUNT: {
        draft.disableModalVisibility = true;
        break;
      }
      case actionTypes.CLOSE_MODAL_ACCOUNT: {
        draft.disableModalVisibility = false;
        break;
      }
      case actionTypes.DISABLE_ACCOUNT_ERROR:
      case actionTypes.ACTIVATE_ACCOUNT_ERROR:
      case actionTypes.ACTIVATE_ACCOUNT_SUCCESS:
      case actionTypes.LOGOUT_USER_ERROR:
      case actionTypes.AUTH_REST_PASSWORD_SUCCESS:
      case actionTypes.AUTH_REGISTER_SUCCESS:
      case actionTypes.AUTH_OTP_VERIFICATION_SUCCESS:
      case actionTypes.AUTH_PHONE_VERIFICATION_SUCCESS:
      case actionTypes.AUTH_REST_PASSWORD_ERROR:
      case actionTypes.AUTH_PHONE_VERIFICATION_ERROR:
      case actionTypes.AUTH_OTP_VERIFICATION_ERROR:
      case actionTypes.AUTH_REGISTER_ERROR:
      case actionTypes.CHECK_CURRENT_ERROR: {
        draft.loading = false;
        break;
      }
      case actionTypes.DISABLE_ACCOUNT_SUCCESS:
      case actionTypes.LOGOUT_USER_SUCCESS: {
        draft.user = null;
        draft.loading = false;
        break;
      }
      case actionTypes.CHECK_CURRENT_SUCCESS: {
        draft.user = payload;
        draft.loading = false;
        break;
      }
    }
  });

export default {
  key: AUTH_REDUCER,
  reducer: authReducer,
};
