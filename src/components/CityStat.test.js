import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { act, waitFor, screen } from '@testing-library/react';
import render, { store } from '../utils/redux-test-utils';
import { fetchWeatherStats } from '../redux/features/weatherSlice';
import CityStat from './CityStat';

const App = () => (
  <BrowserRouter>
    <Link to="/city/name=Alaska - US&lat=-157&lon=398">GoTo</Link>
    <Routes>
      <Route
        path="/city/name=:name&lat=:lat&lon=:lon"
        element={<CityStat />}
      />
      <Route path="*" element={<div />} />
    </Routes>
  </BrowserRouter>
);

describe('tests CityStat', () => {
  it('renders view', () => {
    render(<App />);

    const linkElement = screen.getByText('GoTo');
    expect(linkElement).toBeInTheDocument();
    act(() => linkElement.click());
    waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
  });

  it('renders with stats', async () => {
    render(<App />);

    const mockStats = {
      weather: [{
        icon: 'icon',
        main: 'clouds',
        description: 'blocken clouds',
      }],
      wind: {
        speed: 678,
        deg: 267,
      },
      main: {
        humidity: 33,
        temp: 333,
        temp_min: 322,
        pressure: 432,
      },
      visibility: 120890,
      dt: 23519783058194,
    };
    global.fetch = jest.fn(
      () => Promise.resolve({ json: () => Promise.resolve(mockStats) }),
    );
    store.dispatch(fetchWeatherStats('Alaska - US'));

    act(() => screen.getByText('GoTo').click());
    waitFor(() => {
      expect(screen.getByText('Wind speed')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});
