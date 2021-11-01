import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUpdateInfo = (state) =>
  state.coachUpdateInfoReducer || initialState;

const getErrorSelector = () =>
  createSelector(selectUpdateInfo, (updateInfoState) => updateInfoState.error);

const getLoadingSelector = () =>
  createSelector(
    selectUpdateInfo,
    (updateInfoState) => updateInfoState.isLoading,
  );
export { getErrorSelector, getLoadingSelector, selectUpdateInfo };
