import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachUpdateProfile';

export const translation = defineMessage({
  coachTitle: {
    id: `${scope}.coachTitle`,
    defaultMessage: 'Instructor',
  },
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
  overview: {
    id: `${scope}.overview`,
    defaultMessage: 'Overview',
  },
  requirements: {
    id: `${scope}.requirements`,
    defaultMessage: 'Minimum Qualifications',
  },
  qualifExperience: {
    id: `${scope}.qualifExperience`,
    defaultMessage: '{{years}} years of {{label}} in {{location}}',
  },
  createOffer: {
    id: `${scope}.createOffer`,
    defaultMessage: 'Create Offer',
  },
  deleteOffer: {
    id: `${scope}.deleteOffer`,
    defaultMessage: 'Delete Offer?',
  },
  deleteOfferContent: {
    id: `${scope}.deleteOfferContent`,
    defaultMessage: 'Are you sure you want to delete Offer?',
  },
  noOffers: {
    id: `${scope}.noOffers`,
    defaultMessage:
      'You have no offers yet, please create one to interact with surfers',
  },
  gallery: {
    id: `${scope}.gallery`,
    defaultMessage: 'Gallery',
  },
});
