import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../config/configureStore';
import { useInjectReducer } from '../store/injectReducer';
import * as reducerInjectors from '../store/reducerInjectors';
import { render } from 'react-native-testing-library';

const reducer = (s) => s;

describe('useInjectReducer hook', () => {
  let store;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    injectors = {
      injectReducer: jest.fn(),
    };
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
    store = configureStore({});
    ComponentWithReducer = () => {
      useInjectReducer({ key: 'test', reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      <Provider store={store}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });
});
