import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.containers.ReminderFeedBack';

export const translation = defineMessage({
  message: {
    id: `${scope}.message`,
    defaultMessage: 'We hope you enjoy surfing Welina.\n',
  },
  messageContinue: {
    id: `${scope}.messageContinue`,
    defaultMessage: '',
  },
  pressOn: {
    id: `${scope}.pressOn`,
    defaultMessage: 'Would you please take a moment to give us your feedback?',
  },
  doIt: {
    id: `${scope}.doIt`,
    defaultMessage: "I'll do it ",
  },
  later: {
    id: `${scope}.later`,
    defaultMessage: 'Later',
  },
});
