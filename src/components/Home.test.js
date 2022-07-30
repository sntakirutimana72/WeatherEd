import { screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import render from '../utils/redux-test-utils';
import Home from './Home';

describe('renders Home', () => {
  test('with cities', async () => {
    const citiesMock = [
      {
        name: 'Ohio',
        country: 'US',
        latitude: 435834,
        longitude: 935083,
      },
      {
        name: 'New Jersey',
        country: 'US',
        latitude: 435834,
        longitude: 935083,
      },
      {
        name: 'Florida',
        country: 'US',
        latitude: 435834,
        longitude: 935083,
      },
    ];
    global.fetch = jest.fn(
      () => Promise.resolve({ json: () => Promise.resolve(citiesMock) }),
    );
    render(<BrowserRouter><Home /></BrowserRouter>);
    waitFor(() => expect(screen.getByText(/AMERICA/)).toBeInTheDocument());
  });
});
