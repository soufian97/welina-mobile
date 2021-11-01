import { http, HTTP_METHODS, CONTENT_TYPE } from '../utils/http/http';

const queryString = require('query-string');

export const getSessionsAndPackages = (params) => {
  let request = `offers?${queryString.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const getSessionDetails = (id) =>
  http(`sessions/${id}`, HTTP_METHODS.GET);

export const getPackageDetails = (id) =>
  http(`packages/${id}`, HTTP_METHODS.GET);

export const getImages = (id) =>
  http(`coaches/${id}/gallery`, HTTP_METHODS.GET);

export const getDescription = (id) =>
  http(`coaches/${id}/infos`, HTTP_METHODS.GET);

export const getReviews = (id, params) => {
  let request = `users/${id}/reviews?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const getOffers = (id, params) => {
  let request = `coaches/${id}/offers?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const acceptTerms = () => http('surfers/accept-terms', HTTP_METHODS.PUT);

export const signIn = (data) => http('auth', HTTP_METHODS.POST, { body: data });

export const getCurrent = () => http('auth/current', HTTP_METHODS.GET);

export const register = (data) =>
  http('register/surfers', HTTP_METHODS.POST, { body: data });

export const verfiyPhone = (data) =>
  http('send-otp', HTTP_METHODS.POST, { body: data });

export const verfiyOtp = (data) =>
  http('otp/validate', HTTP_METHODS.POST, { body: data });

export const resetPassword = (data) =>
  http('reset-password', HTTP_METHODS.PUT, { body: data });

export const addReview = ({ userId, review }) =>
  http(`users/${userId}/review`, HTTP_METHODS.POST, {
    body: review,
  });

export const getToken = () => http('chat/token', HTTP_METHODS.POST);

export const sendSms = (id, data) =>
  http(`chat/${id}/sms`, HTTP_METHODS.POST, { body: data });

export const bookOffer = (data) =>
  http('reservations', HTTP_METHODS.POST, { body: data });

export const logout = () => http('logout', HTTP_METHODS.POST);

export const disableAccount = () => http('deactivate', HTTP_METHODS.PUT);

export const activate = () => http('activate', HTTP_METHODS.PUT);

export const getBookingList = (params) => {
  let request = `surfers/reservations?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const getNotifications = (params) => {
  let request = `notifications?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const updateUserInfo = (data) =>
  http('surfers/profile', HTTP_METHODS.PUT, { body: data });

export const getLanguages = () => http('languages', HTTP_METHODS.GET);

export const setBasicInfo = (data) =>
  http('coaches/basic-info', HTTP_METHODS.POST, { body: data });

export const updateBasicInfo = (data) =>
  http('coaches/basic-info', HTTP_METHODS.PUT, { body: data });

export const getEvents = (params) => {
  let request = `coaches/schedule?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const getRecivedRequest = (params) => {
  let request = `reservations/requests?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const getPastRequest = (params) => {
  let request = `reservations/requests/past?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};
export const getRecivedRequestDetails = (id) =>
  http(`reservations/requests/${id}`, HTTP_METHODS.GET);

export const getUserReviews = (id, params) => {
  let request = `users/${id}/reviews?${queryString.stringify(params, {
    skipNull: true,
  })}`;
  return http(request, HTTP_METHODS.GET);
};

export const getUserInfo = (id) =>
  http(`surfers/${id}/infos`, HTTP_METHODS.GET);

export const acceptRequest = (id) =>
  http(`reservations/requests/${id}/accept`, HTTP_METHODS.PATCH);

export const cancelRequest = ({ id }) =>
  http(`reservations/requests/${id}/decline`, HTTP_METHODS.PATCH);
export const coachUpdateUserInfo = (data) =>
  http('coaches/profile', HTTP_METHODS.PUT, { body: data });

export const uploadFile = (data) =>
  http(
    'file-store',
    HTTP_METHODS.POST,
    {
      body: data,
      headers: CONTENT_TYPE.FORM_DATA,
    },
    true,
  );

export const getSkills = () => http('offers/skills', HTTP_METHODS.GET);

export const getCities = (countryCode) =>
  http(`cities/${countryCode}`, HTTP_METHODS.GET);

export const addOffer = (data) =>
  http('offers', HTTP_METHODS.POST, { body: data });

export const contactUs = (data) =>
  http('mobile/contact-us', HTTP_METHODS.POST, { body: data });

export const suggetTimeSlot = ({ id, suggestion }) =>
  http(`reservations/requests/${id}/time-slot`, HTTP_METHODS.PATCH, {
    body: suggestion,
  });
export const cancelBooking = (id) =>
  http(`reservations/requests/${id}/cancel`, HTTP_METHODS.PATCH);

export const getOffer = (offerId) =>
  http(`offers/${offerId}`, HTTP_METHODS.GET);

export const updateOffer = (data) =>
  http(`offers/${data.id}`, HTTP_METHODS.PUT, { body: data });

export const deleteOffer = (data) =>
  http(`offers/${data}`, HTTP_METHODS.DELETE);

export const acceptCoachSuggestion = ({ requestId, newDate }) =>
  http(`reservations/${requestId}/accept/time-slot`, HTTP_METHODS.POST, {
    body: { newDate },
  });

export const addBetaReview = (data) =>
  http('beta-testing', HTTP_METHODS.POST, { body: data });

export const addBetaGeneralReview = (data) =>
  http('beta-testing/global-feedback', HTTP_METHODS.POST, { body: data });

export const getStates = (countryCode) =>
  http(`countries/${countryCode}/states`, HTTP_METHODS.GET);

export const getStateCities = (stateId) =>
  http(`states/${stateId}/cities`, HTTP_METHODS.GET);
