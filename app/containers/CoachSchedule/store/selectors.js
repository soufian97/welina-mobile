import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCoochSchedule = (state) =>
  state.coachScheduleReducer || initialState;

const getEventsSelector = () =>
  createSelector(
    selectCoochSchedule,
    (coachScheduleState) => coachScheduleState.events,
  );
export { getEventsSelector };
