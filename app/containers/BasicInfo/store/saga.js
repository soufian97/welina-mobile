import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { dataImageAppender } from '../../../utils/uploadFile';

export const BASIC_INFO_SAGA = 'basicInfoSaga';

export function* getLanguagesWorker({ callback }) {
  try {
    const languagesResponse = yield api.getLanguages();
    yield put(actionCreators.getLanguagesSuccess(languagesResponse));
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.getLanguagesError(err));
    yield call(callback, err);
  }
}

export function* setBasicInfoWorker({ payload: { data }, callback }) {
  try {
    const { gallery, coverPicture } = data;
    let coverPictureUrl = coverPicture;
    let galleryUrl = [];
    if (typeof coverPicture !== 'string') {
      const dataImage = dataImageAppender(coverPicture);
      const tmpImageBlob = yield api.uploadFile(dataImage);
      coverPictureUrl = tmpImageBlob?.headers?.map?.location;
    }

    const galleryObjects = gallery.filter((item) => typeof item !== 'string');

    for (let i = 0; i < galleryObjects.length; i++) {
      const image = galleryObjects[i];
      const dataImage = dataImageAppender(image);
      const tmpImageBlob = yield api.uploadFile(dataImage);
      galleryUrl.push(tmpImageBlob?.headers?.map?.location);
    }

    const basicInfo = {
      ...data,
      coverPicture: coverPictureUrl,
      gallery: galleryUrl.concat(
        gallery.filter((item) => typeof item === 'string'),
      ),
    };

    if (basicInfo.isUpdateBasicInfo) {
      yield api.updateBasicInfo(basicInfo);
    } else {
      yield api.setBasicInfo(basicInfo);
    }

    yield put(actionCreators.setBasicInfoSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.setBasicInfoError(err));
    yield call(callback, err);
  }
}

function* basicInfoSaga() {
  yield all([
    takeLatest(actionTypes.GET_LANGUAGES, getLanguagesWorker),
    takeLatest(actionTypes.SET_BASIC_INFO, setBasicInfoWorker),
  ]);
}

export default {
  key: BASIC_INFO_SAGA,
  saga: basicInfoSaga,
};
