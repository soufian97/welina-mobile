import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.details';

export const translation = defineMessage({
  session: {
    id: `${scope}.session`,
    defaultMessage: 'session',
  },
  package: {
    id: `${scope}.package`,
    defaultMessage: 'package',
  },
  bookNow: {
    id: `${scope}.bookNow`,
    defaultMessage: 'Book Now',
  },
});
