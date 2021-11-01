import produce from 'immer';
import { CLOSE_MODAL, OPEN_MODAL } from './actions';

export const MODAL_REDUCER = 'modalReducer';

export const initialState = {
  modalKey: null,
  isModalOpen: false,
  params: {},
};

const modalReducer = (state = initialState, { type, payload, params }) =>
  produce(state, (draft) => {
    switch (type) {
      case OPEN_MODAL: {
        draft.modalKey = payload;
        draft.isModalOpen = true;
        draft.params = params;
        break;
      }
      case CLOSE_MODAL: {
        draft.isModalOpen = false;
        draft.params = {};
        draft.modalKey = null;
        break;
      }
    }
  });

export default {
  key: MODAL_REDUCER,
  reducer: modalReducer,
};
