import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachRequests';

export const translation = defineMessage({
  requests: {
    id: `${scope}.requests`,
    defaultMessage: 'Receiving requests',
  },
  noRequests: {
    id: `${scope}.noRequests`,
    defaultMessage: 'There is no requests yet',
  },
});
