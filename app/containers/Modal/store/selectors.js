import { MODAL_REDUCER, initialState } from './reducer';
import { createSelector, createStructuredSelector } from 'reselect';

const getModalState = (state) => state[MODAL_REDUCER] || initialState;

const getModalOpenState = createSelector(
  getModalState,
  (state) => state.isModalOpen,
);

const getModalKeyState = createSelector(
  getModalState,
  (state) => state.modalKey,
);

const getModalParamsState = createSelector(
  getModalState,
  (state) => state.params,
);

const getStructuredState = createStructuredSelector({
  isModalOpen: getModalOpenState,
  modalKey: getModalKeyState,
  params: getModalParamsState,
});

export { getStructuredState };
