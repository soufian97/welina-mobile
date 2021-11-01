import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.components.betaGeneralFeedBack';

export const translation = defineMessage({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'How was your experience browsing the application?',
  },
  later: {
    id: `${scope}.later`,
    defaultMessage: 'Later',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
  thankYou: {
    id: `${scope}.thankYou`,
    defaultMessage: 'Thank you for your feedback !',
  },
  ok: {
    id: `${scope}.ok`,
    defaultMessage: 'Okay !',
  },
});
