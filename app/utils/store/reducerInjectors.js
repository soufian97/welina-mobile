import invariant from 'invariant';
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../../config/reducers';

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) {
      checkStore(store);
    }

    invariant(
      _isString(key) && !_isEmpty(key) && _isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );
    if (
      !(key in store.injectedReducers) &&
      store.injectedReducers[key] !== reducer
    ) {
      store.injectedReducers[key] = reducer;
      store.replaceReducer(createReducer(store.injectedReducers));
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
