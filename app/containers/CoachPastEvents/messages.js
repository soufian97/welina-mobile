import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachPastEvents';

export const translation = defineMessage({
  pastRequests: {
    id: `${scope}.pastRequests`,
    defaultMessage: 'Past Events',
  },
  noRequests: {
    id: `${scope}.noRequests`,
    defaultMessage: 'There is no past event',
  },
});
