import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.messages';

export const translation = defineMessage({
  messages: {
    id: `${scope}.messages`,
    defaultMessage: 'Messages',
  },
  noResult: {
    id: `${scope}.noResult`,
    defaultMessage: 'No Contact Found',
  },
  noResultDescription: {
    id: `${scope}.noResultDescription`,
    defaultMessage: "You didn't  contacted any coach yet",
  },
});
