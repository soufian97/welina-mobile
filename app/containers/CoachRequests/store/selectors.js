import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectReceivedRequest = (state) =>
  state.receivedRequestReducer || initialState;

const getReceivedRequestSelector = () =>
  createSelector(
    selectReceivedRequest,
    (receivedListState) => receivedListState.requests,
  );
const getIsLastPageSelector = () =>
  createSelector(
    selectReceivedRequest,
    (receivedListState) => receivedListState.lastPage,
  );
const getReceivedRequestLoaderSelector = () =>
  createSelector(
    selectReceivedRequest,
    (receivedListState) => receivedListState.isLoading,
  );

const getReceivedRequestPreviewSelector = () =>
  createSelector(selectReceivedRequest, (receivedListState) => ({
    totalElements: receivedListState.totalElements,
    lastRequest: receivedListState.requests[0],
  }));

export {
  selectReceivedRequest,
  getReceivedRequestSelector,
  getIsLastPageSelector,
  getReceivedRequestLoaderSelector,
  getReceivedRequestPreviewSelector,
};
