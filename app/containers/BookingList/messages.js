import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.BookingList';

export const translation = defineMessage({
  upcoming: {
    id: `${scope}.upcoming`,
    defaultMessage: 'Upcoming',
  },
  past: {
    id: `${scope}.past`,
    defaultMessage: 'Past',
  },
  canceled: {
    id: `${scope}.canceled`,
    defaultMessage: 'Cancelled',
  },
  session: {
    id: `${scope}.session`,
    defaultMessage: ' Session',
  },
  book: {
    id: `${scope}.book`,
    defaultMessage: 'Book now',
  },
  noResult: {
    id: `${scope}.noResult`,
    defaultMessage: 'No result found',
  },
  noResultDescription: {
    id: `${scope}.noResultDescription`,
    defaultMessage: 'The result you are looking for doesn’t seem to exist',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  cancelQuestion: {
    id: `${scope}.cancelQuestion`,
    defaultMessage: 'Cancel your request',
  },
  cancelContent: {
    id: `${scope}.cancelContent`,
    defaultMessage: 'Are you sure you wanna cancel this request?',
  },
});
