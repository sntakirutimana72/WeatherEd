import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchStatEffect,
  fetchPendingEffect,
} from '../effects/weatherStatEffects';
import { getCities, getWeatherStats } from '../../apis/weatherApi';

export const actions = {
  FULFILLED: 'weather/fetchStat/fulfilled',
  REJECTED: 'weather/fetchStat/rejected',
  PENDING: 'weather/fetchStat/pending',
};

export const fetchWeatherStats = (name, lon, lat) => (dispatch) => {
  dispatch({ type: actions.PENDING, name });
  getWeatherStats(lon, lat).then(
    (stats) => dispatch({
      type: actions.FULFILLED,
      stats: fetchStatEffect(stats),
      name,
    }),
  ).catch(
    () => dispatch({ type: actions.REJECTED, name }),
  );
};

export const fetchCities = createAsyncThunk('fetchCities', getCities);

const initialState = {
  status: 'idle',
  cities: [],
  stats: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PENDING:
      return fetchPendingEffect(state, action);
    case actions.FULFILLED:
      return {
        ...state,
        stats: state.stats.map((stats) => (
          stats.name !== action.name
            ? stats
            : {
              ...stats,
              ...action.stats,
              status: 'fulfilled',
            }
        )),
      };
    case actions.REJECTED:
      return {
        ...state,
        stats: state.stats.map((stats) => (
          stats.name !== action.name
            ? stats
            : {
              ...stats,
              status: 'failed',
            }
        )),
      };
    case fetchCities.pending.type:
      return {
        ...state,
        status: 'pending',
      };
    case fetchCities.fulfilled.type:
      return {
        ...state,
        status: 'fulfilled',
        cities: action.payload,
      };
    case fetchCities.rejected.type:
      return {
        ...state,
        status: 'failed',
      };
    default:
      return state;
  }
};

export default reducer;
