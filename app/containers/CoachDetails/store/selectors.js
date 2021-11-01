import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCoochDetails = (state) => state.coachDetailsReducer || initialState;

const getImagesSelector = () =>
  createSelector(
    selectCoochDetails,
    (coachDetailsState) => coachDetailsState.images,
  );

const getDescriptionSelector = () =>
  createSelector(
    selectCoochDetails,
    (coachDetailsState) => coachDetailsState.description,
  );

const getReviewsSelector = () =>
  createSelector(
    selectCoochDetails,
    (coachDetailsState) => coachDetailsState.reviews,
  );

const getIsLastReviewsPage = () =>
  createSelector(
    selectCoochDetails,
    (coachDetailsState) => coachDetailsState.reviewsLastPage,
  );

const getOffersSelector = () =>
  createSelector(
    selectCoochDetails,
    (coachDetailsState) => coachDetailsState.offers,
  );

const getIsLastOffersPage = () =>
  createSelector(
    selectCoochDetails,
    (coachDetailsState) => coachDetailsState.offersLastPage,
  );

const getCoachDetailsLoaderSelector = () =>
  createSelector(
    selectCoochDetails,
    (coachDetailsState) => coachDetailsState.isLoading,
  );

export {
  getImagesSelector,
  getDescriptionSelector,
  getReviewsSelector,
  getIsLastReviewsPage,
  getOffersSelector,
  getIsLastOffersPage,
  getCoachDetailsLoaderSelector,
};
