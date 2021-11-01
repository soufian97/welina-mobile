import AsyncStorage from '@react-native-community/async-storage';
import _zip from 'lodash/zip';
import _zipObject from 'lodash/zipObject';
import _unzip from 'lodash/unzip';
import _isArray from 'lodash/isArray';

export const save = (key, value) => {
  return !_isArray(key)
    ? AsyncStorage.setItem(key, JSON.stringify(value))
    : AsyncStorage.multiSet(_zip(key, value.map(JSON.stringify)));
};

export const get = (key) => {
  if (_isArray(key)) {
    return AsyncStorage.multiGet(key).then((e) => {
      const unzipArray = _unzip(e);
      const keys = unzipArray[0];
      const values = unzipArray[1].map(JSON.parse);
      return _zipObject(keys, values);
    });
  } else {
    return AsyncStorage.getItem(key).then(JSON.parse);
  }
};
export const getArray = (keys) => {
  if (keys.length === 0) {
    return Promise.resolve([]);
  }
  return AsyncStorage.multiGet(keys).then((e) => {
    let unzipArray = _unzip(e);
    return unzipArray[1].map(JSON.parse);
  });
};
export const getAllKeys = () => {
  return AsyncStorage.getAllKeys();
};

export const update = (key, value) => {
  return AsyncStorage.setItem(key, JSON.stringify(value));
};

export const merge = (key, value) => {
  return !_isArray(key)
    ? AsyncStorage.mergeItem(key, JSON.stringify(value))
    : AsyncStorage.multiMerge(_zip(key, value));
};

export const remove = (key) => {
  return !_isArray(key)
    ? AsyncStorage.removeItem(key)
    : AsyncStorage.multiRemove(key);
};

export const clear = async () => {
  return AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
};
