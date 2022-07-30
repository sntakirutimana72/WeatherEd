import { waitFor } from '@testing-library/react';
import reducer, {
  actions,
  fetchWeatherStats,
  fetchCities,
} from './weatherSlice';
import { store } from '../../utils/redux-test-utils';

const initial = {
  status: 'idle',
  cities: [],
  stats: [],
};
describe('tests weather stats', () => {
  it(actions.PENDING, () => {
    const pendingAction = {
      type: actions.PENDING,
      name: 'San Francisco - US',
    };
    expect(
      reducer(initial, pendingAction),
    ).toEqual({
      ...initial,
      stats: [{
        name: 'San Francisco - US', status: 'pending',
      }],
    });
  });

  it(actions.FULFILLED, () => {
    const currentState = {
      ...initial,
      stats: [
        {
          name: 'San Francisco - US', status: 'fulfilled',
        },
        {
          name: 'Ohio - US', status: 'pending',
        },
      ],
    };
    const mockStats = {
      icon: 'icon',
      speed: 'speed',
    };
    const fulfilledAction = {
      type: actions.FULFILLED,
      stats: mockStats,
      name: 'Ohio - US',
    };
    expect(
      reducer(currentState, fulfilledAction),
    ).toEqual({
      ...currentState,
      stats: [
        currentState.stats[0],
        {
          ...mockStats,
          name: 'Ohio - US',
          status: 'fulfilled',
        },
      ],
    });
  });

  it('fetchWeatherStats', async () => {
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

    store.dispatch(fetchWeatherStats('Ohio - US'));

    await waitFor(() => {
      const { weather } = store.getState();
      expect(weather.stats).toHaveLength(1);
      expect(weather).toEqual({
        status: 'idle',
        cities: [],
        stats: [{
          name: 'Ohio - US',
          status: 'fulfilled',
          icon: 'icon',
          main: 'clouds',
          details: {
            'Wind degree': 267,
            'Wind speed': 678,
            Humidity: 33,
            Pressure: 432,
            Temperature: 333,
            Visibility: 120890,
          },
        }],
      });
    });
  });

  it(actions.REJECTED, () => {
    const currentState = {
      ...initial,
      stats: [
        {
          name: 'Arizona - US', status: 'pending',
        },
      ],
    };
    const rejectedAction = {
      type: actions.REJECTED, name: 'Arizona - US',
    };
    expect(
      reducer(currentState, rejectedAction),
    ).toEqual({
      ...currentState,
      stats: [
        {
          ...currentState.stats[0], status: 'failed',
        },
      ],
    });
  });
});

describe('test fetch cities', () => {
  it(fetchCities.pending.type, () => {
    expect(reducer(initial, fetchCities.pending)).toEqual({
      ...initial,
      status: 'pending',
    });
  });

  it(fetchCities.rejected.type, () => {
    expect(reducer(initial, fetchCities.rejected)).toEqual({
      ...initial,
      status: 'failed',
    });
  });

  it(fetchCities.fulfilled.type, () => {
    const cities = [
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
    const { fulfilled } = fetchCities;
    expect(
      reducer(initial, { ...fulfilled, payload: cities }),
    ).toEqual({
      ...initial,
      cities,
      status: 'fulfilled',
    });
  });
});
