import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachDetails';

export const translation = defineMessage({
  reviews: {
    id: `${scope}.reviews`,
    defaultMessage: ' ({{reviews}} reviews)',
  },
  reviewsText: {
    id: `${scope}.reviewsText`,
    defaultMessage: 'Reviews',
  },
  write: {
    id: `${scope}.write`,
    defaultMessage: 'Write a Review',
  },
  recommend: {
    id: `${scope}.recommend`,
    defaultMessage: 'Recommend',
  },
  communication: {
    id: `${scope}.communication`,
    defaultMessage: 'Communication',
  },
  rating: {
    id: `${scope}.rating`,
    defaultMessage: 'Rating : Overall Experience',
  },
  anonymous: {
    id: `${scope}.anonymous`,
    defaultMessage: 'Anonymous',
  },
  noImages: {
    id: `${scope}.noImages`,
    defaultMessage: 'No Images Found',
  },
  noImagesDescription: {
    id: `${scope}.noImagesDescription`,
    defaultMessage: 'The coach has no images yet',
  },
  noReviews: {
    id: `${scope}.noReviews`,
    defaultMessage: 'No Reviews Found',
  },
  noReviewsDescription: {
    id: `${scope}.noReviewsDescription`,
    defaultMessage: "You didn't receive any reviews yet",
  },
});
