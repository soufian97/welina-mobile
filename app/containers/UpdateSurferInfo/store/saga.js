import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actions';
import * as actionCreators from './actions.creator';
import * as api from '../../../config/apis';
import { dataImageAppender } from '../../../utils/uploadFile';
import { isNull, pickBy } from 'lodash';

export const UPDATE_INFO_SAGA = 'updateInfoSaga';

export function* updateInfoWorker({ payload: { data }, callback }) {
  try {
    let profilePicture = data.photo;
    if (profilePicture) {
      const dataProfile = dataImageAppender(data.photo);
      profilePicture = yield api.uploadFile(dataProfile);
      profilePicture = profilePicture
        ? profilePicture?.headers?.map?.location
        : null;
    }
    const updateProfileData = {
      ...data,
      photo: profilePicture,
    };
    yield api.updateUserInfo(pickBy(updateProfileData, (val) => !isNull(val)));
    yield put(actionCreators.updateInfoSuccess());
    yield call(callback);
  } catch (err) {
    yield put(actionCreators.updateInfoError(err));
    yield call(callback, err);
  }
}

function* updateInfoSaga() {
  yield all([takeLatest(actionTypes.UPDATE_INFO, updateInfoWorker)]);
}

export default {
  key: UPDATE_INFO_SAGA,
  saga: updateInfoSaga,
};
