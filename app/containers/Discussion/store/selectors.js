import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDiscussion = (state) => state.discussionReducer || initialState;

const getTokenSelector = () =>
  createSelector(selectDiscussion, (discussionState) => discussionState.token);

const getDiscussionLoader = () =>
  createSelector(
    selectDiscussion,
    (discussionState) => discussionState.isLoading,
  );

export { getTokenSelector, getDiscussionLoader };
