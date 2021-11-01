import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBsicInfo = (state) => state.basicInfoReducer || initialState;

const getLanguagesSelector = () =>
  createSelector(selectBsicInfo, (basicInfoState) =>
    basicInfoState.languages.map((language) => ({
      value: language.id,
      label: language.name,
    })),
  );

const getBasicInfoLoaderSelector = () =>
  createSelector(selectBsicInfo, (basicInfoState) => basicInfoState.isLoading);

export { selectBsicInfo, getLanguagesSelector, getBasicInfoLoaderSelector };
