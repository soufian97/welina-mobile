import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddOfferState = (state) => state.addOfferReducer || initialState;

const getCitiesSelector = () =>
  createSelector(selectAddOfferState, (addOfferState) =>
    addOfferState.cities.map((city) => ({
      value: city.id,
      label: city.label,
    })),
  );

const getStatesSelector = () =>
  createSelector(selectAddOfferState, (addOfferState) =>
    addOfferState.states.map((state) => ({
      value: state.id,
      label: state.label,
    })),
  );

const getSkillsSelector = () =>
  createSelector(selectAddOfferState, (addOfferState) => addOfferState.skills);

const getaddOfferLoaderSelector = () =>
  createSelector(
    selectAddOfferState,
    (addOfferState) => addOfferState.isLoading,
  );

const getOfferSelector = () =>
  createSelector(
    selectAddOfferState,
    (addOfferState) => addOfferState.offerToUpdate,
  );

export {
  selectAddOfferState,
  getCitiesSelector,
  getaddOfferLoaderSelector,
  getSkillsSelector,
  getOfferSelector,
  getStatesSelector,
};
