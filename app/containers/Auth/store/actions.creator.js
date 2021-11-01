import * as actionTypes from './actions';

export const createAccount = (data, callback) => ({
  type: actionTypes.AUTH_REGISTER,
  payload: { data },
  callback,
});

export const createAccountSuccess = (payload) => ({
  type: actionTypes.AUTH_REGISTER_SUCCESS,
  payload,
});
export const createAccountError = (payload) => ({
  type: actionTypes.AUTH_REGISTER_ERROR,
  payload,
});

export const verifyPhoneNumber = (data, callback) => ({
  type: actionTypes.AUTH_PHONE_VERIFICATION,
  payload: { data },
  callback,
});

export const verifyPhoneNumberSuccess = (payload) => ({
  type: actionTypes.AUTH_PHONE_VERIFICATION_SUCCESS,
  payload,
});

export const verifyPhoneNumberError = (payload) => ({
  type: actionTypes.AUTH_PHONE_VERIFICATION_ERROR,
  payload,
});

export const verifyOTP = (data, callback) => ({
  type: actionTypes.AUTH_OTP_VERIFICATION,
  payload: { data },
  callback,
});

export const verifyOTPSuccess = () => ({
  type: actionTypes.AUTH_OTP_VERIFICATION_SUCCESS,
});

export const verifyOTPError = (payload) => ({
  type: actionTypes.AUTH_OTP_VERIFICATION_ERROR,
  payload,
});

export const resetPassword = (data, callback) => ({
  type: actionTypes.AUTH_REST_PASSWORD,
  payload: { data },
  callback,
});

export const resetPasswordSuccess = () => ({
  type: actionTypes.AUTH_REST_PASSWORD_SUCCESS,
});

export const resetPasswordError = (payload) => ({
  type: actionTypes.AUTH_REST_PASSWORD_ERROR,
  payload,
});

export const checkCurrent = (callback) => ({
  type: actionTypes.CHECK_CURRENT,
  callback,
});

export const checkCurrentSuccess = (payload) => ({
  type: actionTypes.CHECK_CURRENT_SUCCESS,
  payload: payload,
});

export const checkCurrentError = (err) => ({
  type: actionTypes.CHECK_CURRENT_ERROR,
  payload: err,
});

export const logoutUser = (callback) => ({
  type: actionTypes.LOGOUT_USER,
  callback,
});

export const logoutUserSuccess = () => ({
  type: actionTypes.LOGOUT_USER_SUCCESS,
});
export const logoutUserError = (payload) => ({
  type: actionTypes.LOGOUT_USER_ERROR,
  payload,
});

export const disableAccount = (callback) => ({
  type: actionTypes.DISABLE_ACCOUNT,
  callback,
});

export const disableAccountSuccess = () => ({
  type: actionTypes.DISABLE_ACCOUNT_SUCCESS,
});
export const disableAccountError = (payload) => ({
  type: actionTypes.DISABLE_ACCOUNT_ERROR,
  payload,
});

export const openModalDisableAccount = () => ({
  type: actionTypes.OPEN_MODAL_ACCOUNT,
});
export const closeModalDisableAccount = () => ({
  type: actionTypes.CLOSE_MODAL_ACCOUNT,
});

export const activateAccount = (callback) => ({
  type: actionTypes.ACTIVATE_ACCOUNT,
  callback,
});

export const activateAccountSuccess = () => ({
  type: actionTypes.ACTIVATE_ACCOUNT_SUCCESS,
});
export const activateAccountError = (payload) => ({
  type: actionTypes.ACTIVATE_ACCOUNT_ERROR,
  payload,
});
