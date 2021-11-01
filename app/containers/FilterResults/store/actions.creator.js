import * as actionTypes from './actions';

export const getSessionsAndPackagesByFilters = (data, callback) => ({
  type: actionTypes.GET_PACKAGES_BY_FILTERS,
  payload: {
    data: data,
  },
  callback,
});

export const getPackagesByFiltersSuccess = (payload) => ({
  type: actionTypes.GET_PACKAGES_BY_FILTERS_SUCCESS,
  payload,
});

export const getPackagesByFiltersError = (payload) => ({
  type: actionTypes.GET_PACKAGES_BY_FILTERS_ERROR,
  payload,
});
