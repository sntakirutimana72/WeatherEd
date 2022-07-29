import { screen, waitFor } from '@testing-library/react';
import render from './utils/redux-test-utils';
import App from './App';

test('renders app', () => {
  global.fetch = jest.fn(() => Promise.reject());
  render(<App />);
  waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
});
