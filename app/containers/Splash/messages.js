import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.splash';

export const translation = defineMessage({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Find your surf destination',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Book your best surf adventure & spots in one click!',
  },
  buttonTitle: {
    id: `${scope}.buttonTitle`,
    defaultMessage: 'Browse location',
  },
  coachButtonTitle: {
    id: `${scope}.coachButtonTitle`,
    defaultMessage: 'Go to dashboard',
  },
});
