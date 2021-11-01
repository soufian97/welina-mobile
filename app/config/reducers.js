import { combineReducers } from 'redux';
import appReducer from '../containers/Splash/store/reducer';

export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    app: appReducer.reducer,
    ...injectedReducers,
  });
}
