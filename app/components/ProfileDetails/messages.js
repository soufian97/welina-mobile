import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.containers.coachProfile';

export const translation = defineMessage({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  offers: {
    id: `${scope}.offers`,
    defaultMessage: 'Offers',
  },
  reviews: {
    id: `${scope}.reviews`,
    defaultMessage: 'Reviews',
  },
});
