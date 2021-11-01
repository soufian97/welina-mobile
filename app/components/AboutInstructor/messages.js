import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.containers.aboutinstructor';

export const translation = defineMessage({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'About the instructor',
  },
  readmore: {
    id: `${scope}.readmore`,
    defaultMessage: 'Read more...',
  },
  book: {
    id: `${scope}.book`,
    defaultMessage: 'Book now',
  },
  session: {
    id: `${scope}.session`,
    defaultMessage: ' session',
  },
  package: {
    id: `${scope}.package`,
    defaultMessage: ' package',
  },
  adults: {
    id: `${scope}.adults`,
    defaultMessage: 'Adults: {{price}}',
  },
  kids: {
    id: `${scope}.kids`,
    defaultMessage: 'Kids: {{price}}',
  },
  teens: {
    id: `${scope}.Teens`,
    defaultMessage: 'Teens: {{price}}',
  },
});
