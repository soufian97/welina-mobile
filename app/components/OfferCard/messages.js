import { defineMessage } from '../I18n/defineMessage';

const scope = 'app.containers.offerCard';

export const translation = defineMessage({
  editOffer: {
    id: `${scope}.editOffer`,
    defaultMessage: 'Update Offer',
  },
  review: {
    id: `${scope}.review`,
    defaultMessage: 'review',
  },
  deleteOffer: {
    id: `${scope}.deleteOffer`,
    defaultMessage: 'Delete Offer',
  },
});
