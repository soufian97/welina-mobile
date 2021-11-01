import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { pickBy, identity } from 'lodash';
import { dataImageAppender } from '../../../utils/uploadFile';

export const COACH_UPDATE_INFO_SAGA = 'coachUpdateInfoSaga';

export function* coachUpdateInfoWorker({ payload: { data }, callback }) {
  try {
    let profilePicture = null;
    let coverPicture = null;
    if (data.photo) {
      const dataProfile = dataImageAppender(data.photo);
      profilePicture = yield api.uploadFile(dataProfile);
      profilePicture = profilePicture
        ? profilePicture?.headers?.map?.location
        : null;
    }

    if (data.coverPicture) {
      const dataCover = dataImageAppender(data.coverPicture);
      coverPicture = yield api.uploadFile(dataCover);
      coverPicture = coverPicture ? coverPicture?.headers?.map?.location : null;
    }

    const updateProfileData = {
      ...data,
      photo: profilePicture,
      coverPicture: coverPicture,
    };

    yield api.coachUpdateUserInfo(pickBy(updateProfileData, identity));
    yield put(actionCreators.coachUpdateInfoSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.coachUpdateInfoError(err));
    yield call(callback, err);
  }
}

function* coachUpdateInfoSaga() {
  yield all([takeLatest(actionTypes.COACH_UPDATE_INFO, coachUpdateInfoWorker)]);
}

export default {
  key: COACH_UPDATE_INFO_SAGA,
  saga: coachUpdateInfoSaga,
};
