import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMessages = (state) => state.messagesReducer || initialState;

const getTokenSelector = () =>
  createSelector(selectMessages, (messagesState) => messagesState.token);

const getMessagesLoader = () =>
  createSelector(selectMessages, (messagesState) => messagesState.isLoading);

const getChannelsSelector = () =>
  createSelector(selectMessages, (messagesState) => messagesState.channels);

export { getTokenSelector, getMessagesLoader, getChannelsSelector };
