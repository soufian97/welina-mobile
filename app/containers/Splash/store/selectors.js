import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = (state) => state.homeReducer || initialState;

const getHomeLoaderSelector = () =>
  createSelector(selectApp, (appState) => appState.isLoading);

const getErrorSelector = () =>
  createSelector(selectApp, (appState) => appState.error);

const getModalVisibilitySelector = () =>
  createSelector(selectApp, (appState) => appState.modalVisibility);

const getMessageSelector = () =>
  createSelector(selectApp, (appState) => appState.message);

const getSuccessModalVisibilitySelector = () =>
  createSelector(selectApp, (appState) => appState.successModalVisibility);

const getToastPropertiesSelector = () =>
  createSelector(selectApp, (appState) => appState.toast);

const getPastEventsModalSelector = () =>
  createSelector(selectApp, (appState) => appState.pastEventsModalVisibility);

const getBetaTestModalVisibilitySelector = () =>
  createSelector(selectApp, (appState) => appState.betaTestModalOpen);

const getBetaTestStickerVisibilitySelector = () =>
  createSelector(selectApp, (appState) => appState.betaTestSticker);

const getBetaGeneralTestModalVisibilitySelector = () =>
  createSelector(selectApp, (appState) => appState.betaGeneralTestModalOpen);

const getBetaTestSuccessModalVisibilitySelector = () =>
  createSelector(selectApp, (appState) => appState.betaSuccessModalVisibility);

const getBetaReminderDateSelector = () =>
  createSelector(selectApp, (appState) => appState.betaReminderDate);

const getHasNewNotificationState = () =>
  createSelector(selectApp, (appState) => appState.hasNewNotification);

export {
  getErrorSelector,
  getModalVisibilitySelector,
  getHomeLoaderSelector,
  getSuccessModalVisibilitySelector,
  getMessageSelector,
  getToastPropertiesSelector,
  getPastEventsModalSelector,
  getBetaTestModalVisibilitySelector,
  getBetaTestStickerVisibilitySelector,
  getBetaGeneralTestModalVisibilitySelector,
  getBetaTestSuccessModalVisibilitySelector,
  getBetaReminderDateSelector,
  getHasNewNotificationState,
};
