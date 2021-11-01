import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachDashboard';

export const translation = defineMessage({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome',
  },
  requests: {
    id: `${scope}.requests`,
    defaultMessage: 'Requests',
  },
  messages: {
    id: `${scope}.messages`,
    defaultMessage: 'Messages',
  },
  reviews: {
    id: `${scope}.reviews`,
    defaultMessage: 'Reviews',
  },
  seeAll: {
    id: `${scope}.seeAll`,
    defaultMessage: 'See All',
  },
  noDataTitle: {
    id: `${scope}.noDataTitle`,
    defaultMessage: 'No {{type}} Yet',
  },
  noDataBody: {
    id: `${scope}.noDataBody`,
    defaultMessage: 'The result you are looking for doesn’t seem to exist',
  },
});
