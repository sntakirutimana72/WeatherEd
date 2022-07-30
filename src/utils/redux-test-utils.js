import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import store from '../redux';

const ReduxWrapper = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

ReduxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default (Component) => render(
  Component,
  { wrapper: ReduxWrapper },
);

export {
  store,
  ReduxWrapper,
};
