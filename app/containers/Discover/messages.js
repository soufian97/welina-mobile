import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.discover';

export const translation = defineMessage({
  book: {
    id: `${scope}.book`,
    defaultMessage: 'Book now',
  },
  typeAvailableSessions: {
    id: `${scope}.typeAvailableSessions`,
    defaultMessage: 'Available sessions',
  },
  typePackages: {
    id: `${scope}.typePackages`,
    defaultMessage: 'Packages',
  },
  recently: {
    id: `${scope}.recently`,
    defaultMessage: 'Recently added',
  },
  available: {
    id: `${scope}.available`,
    defaultMessage: 'See all',
  },
  location: {
    id: `${scope}.location`,
    defaultMessage: 'Your surf location',
  },
  noResult: {
    id: `${scope}.noResult`,
    defaultMessage: 'No result found',
  },
  noResultDescription: {
    id: `${scope}.noResultDescription`,
    defaultMessage: 'The result you are looking for doesn’t seem to exist',
  },
});
