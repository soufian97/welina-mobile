import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.writeReview';

export const translation = defineMessage({
  howWouldYouRate: {
    id: `${scope}.howWouldYouRate`,
    defaultMessage:
      'How would you rate your overall experience\nwith {{name}}?',
  },
  wouldYouRecommend: {
    id: `${scope}.wouldYouRecommend`,
    defaultMessage: 'Would you recommend {{name}}?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  writeReview: {
    id: `${scope}.writeReview`,
    defaultMessage: 'Write a review',
  },
  tellPeople: {
    id: `${scope}.tellPeople`,
    defaultMessage: 'Tell people about your experience',
  },
  publicAnonymously: {
    id: `${scope}.publicAnonymously`,
    defaultMessage: 'Post as anonymous',
  },
  sendReview: {
    id: `${scope}.sendReview`,
    defaultMessage: 'Send review',
  },
});
