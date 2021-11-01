import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.components.seePastEventsPopup';

export const translation = defineMessage({
  agree: {
    id: `${scope}.agree`,
    defaultMessage: 'Yes',
  },
  disagree: {
    id: `${scope}.disagree`,
    defaultMessage: 'No',
  },
  pastEventsBody: {
    id: `${scope}.pastEventsBody`,
    defaultMessage: 'Time to review, rate and comment your most recent session',
  },
});
