import React from 'react';
import { put } from 'redux-saga/effects';
import { render } from 'react-native-testing-library';

import { Provider } from 'react-redux';
import configureStore from '../../config/configureStore';
import { useInjectSaga } from '../store/injectSaga';
import * as sagaInjectors from '../store/sagaInjectors';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('useInjectSaga hook', () => {
  let store;
  let injectors;
  let ComponentWithSaga;

  beforeAll(() => {
    sagaInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({});
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga = () => {
      useInjectSaga({
        key: 'test',
        saga: testSaga,
        mode: 'testMode',
      });
      return null;
    };
    sagaInjectors.default.mockClear();
  });

  it('should inject given saga and mode', () => {
    const props = { test: 'test' };
    render(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith('test', {
      saga: testSaga,
      mode: 'testMode',
    });
  });

  it('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const { unmount } = render(
      <Provider store={store}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );
    unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });
});
