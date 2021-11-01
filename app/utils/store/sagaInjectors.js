import invariant from 'invariant';
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import _conformsTo from 'lodash/conformsTo';

import checkStore from './checkStore';
import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from '../../config/app.constant';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key) =>
  invariant(
    _isString(key) && !_isEmpty(key),
    '(app/utils...) injectSaga: Expected `key` to be a non empty string',
  );

const checkDescriptor = (descriptor) => {
  const shape = {
    saga: _isFunction,
    mode: (mode) => _isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    _conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor',
  );
};

export function injectSagaFactory(store, isValid) {
  return function injectSaga(key, descriptor = {}, args) {
    if (!isValid) {
      checkStore(store);
    }

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON,
    };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = key in store.injectedSagas;

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
    }
  };
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) {
      checkStore(store);
    }

    checkKey(key);

    if (key in store.injectedSagas) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        store.injectedSagas[key] = 'done';
      }
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
