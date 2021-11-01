import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { dataImageAppender } from '../../../utils/uploadFile';

export const ADD_OFFER_SAGA = 'addOfferSaga';

export function* getCitiesWorker({ payload: { data }, callback }) {
  try {
    const citiesResponse = yield api.getCities(data);
    yield put(actionCreators.getCitiesSuccess(citiesResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getCitiesError(err));
    yield call(callback, err);
  }
}

export function* getStateCitiesWorker({ payload: { data }, callback }) {
  try {
    const citiesResponse = yield api.getStateCities(data);
    yield put(actionCreators.getStateCitiesSuccess(citiesResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getStateCitiesError(err));
    yield call(callback, err);
  }
}

export function* getStatesWorker({ payload: { data }, callback }) {
  try {
    const statesResponse = yield api.getStates(data);
    yield put(actionCreators.getStatesSuccess(statesResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getStatesError(err));
    yield call(callback, err);
  }
}

export function* getSkillsWorker({ callback }) {
  try {
    const skillsResponse = yield api.getSkills();
    yield put(actionCreators.getSkillsSuccess(skillsResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getSkillsError(err));
    yield call(callback, err);
  }
}

export function* addOfferWorker({ payload: { data }, callback }) {
  try {
    const { gallery, photo } = data;
    let photoUrl = photo;
    let galleryUrl = [];
    if (typeof photo !== 'string') {
      const dataImage = dataImageAppender(photo);
      const tmpImageBlob = yield api.uploadFile(dataImage);
      photoUrl = tmpImageBlob?.headers?.map?.location;
    }
    const galleryObjects = gallery.filter((item) => typeof item !== 'string');

    for (let i = 0; i < galleryObjects.length; i++) {
      const image = galleryObjects[i];
      const dataImage = dataImageAppender(image);
      const tmpImageBlob = yield api.uploadFile(dataImage);
      galleryUrl.push(tmpImageBlob?.headers?.map?.location);
    }
    const offer = {
      ...data,
      photo: photoUrl,
      gallery: galleryUrl.concat(
        gallery.filter((item) => typeof item === 'string'),
      ),
    };
    if (offer.id) {
      yield api.updateOffer(offer);
    } else {
      yield api.addOffer(offer);
    }
    yield put(actionCreators.addOfferSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.addOfferError(err));
    yield call(callback, err);
  }
}

export function* getOfferWorker({ payload: { data }, callback }) {
  try {
    const offerResponse = yield api.getOffer(data);
    yield put(actionCreators.getOfferSuccess(offerResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getOfferError(err));
    yield call(callback, err);
  }
}

export function* deleteOfferWorker({ payload: { data }, callback }) {
  try {
    yield api.deleteOffer(data);
    yield put(actionCreators.deleteOfferSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.deleteOfferError(err));
    yield call(callback, err);
  }
}

function* addOfferSaga() {
  yield all([
    takeLatest(actionTypes.GET_CITIES, getCitiesWorker),
    takeLatest(actionTypes.GET_STATES_CITIES, getStateCitiesWorker),
    takeLatest(actionTypes.GET_STATES, getStatesWorker),
    takeLatest(actionTypes.GET_SKILLS, getSkillsWorker),
    takeLatest(actionTypes.ADD_OFFER, addOfferWorker),
    takeLatest(actionTypes.GET_OFFER, getOfferWorker),
    takeLatest(actionTypes.DELETE_OFFER, deleteOfferWorker),
  ]);
}

export default {
  key: ADD_OFFER_SAGA,
  saga: addOfferSaga,
};
