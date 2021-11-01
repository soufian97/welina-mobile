import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.offers';

export const translation = defineMessage({
  book: {
    id: `${scope}.book`,
    defaultMessage: 'Book Now',
  },
  adultPrice: {
    id: `${scope}.adultPrice`,
    defaultMessage: 'Adults : {{price}} {{currency}}',
  },
  studentPrice: {
    id: `${scope}.studentPrice`,
    defaultMessage: 'Students : {{price}} {{currency}}',
  },
  kidsPrice: {
    id: `${scope}.kidsPrice`,
    defaultMessage: '5 – 18 Year-old : {{price}} {{currency}}',
  },
  session: {
    id: `${scope}.session`,
    defaultMessage: ' Session',
  },
  noOffers: {
    id: `${scope}.noOffers`,
    defaultMessage: 'No Offers Found',
  },
  noOffersDescription: {
    id: `${scope}.noOffersDescription`,
    defaultMessage:
      'There are no offers with the criterias you selected, please try with others criterias',
  },
});
