import React from 'react';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

const useInjectSaga = ({ key, saga, mode, eject = true }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    const injectors = getInjectors(context.store);
    injectors.injectSaga(key, { saga, mode });

    return () => {
      eject && injectors.ejectSaga(key);
    };
  }, [context.store, eject, key, mode, saga]);
};

export { useInjectSaga };
