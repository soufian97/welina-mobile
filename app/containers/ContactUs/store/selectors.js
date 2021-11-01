import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectContactUs = (state) => state.contactUsReducer || initialState;

const getContactUsLoaderSelector = () =>
  createSelector(selectContactUs, (contactUsState) => contactUsState.isLoading);

export { getContactUsLoaderSelector };
