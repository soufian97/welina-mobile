import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.requestCancelation';

export const translation = defineMessage({
  screenTitle: {
    id: `${scope}.screentitle`,
    defaultMessage: 'Would you like to suggest another slot ?',
  },
  wirteMessage: {
    id: `${scope}.wirteMessage`,
    defaultMessage: 'Write a message to surfer',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  decline: {
    id: `${scope}.decline`,
    defaultMessage: 'Decline',
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm',
  },
  confirmSuggestion: {
    id: `${scope}.confirmSuggestion`,
    defaultMessage: 'Would you like to confirm the coach suggestion?',
  },
  cancelQuestion: {
    id: `${scope}.cancelQuestion`,
    defaultMessage: 'Cancel your request',
  },
  cancelContent: {
    id: `${scope}.cancelContent`,
    defaultMessage: 'Are you sure you wanna cancel this request?',
  },
});
