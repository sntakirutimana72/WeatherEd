import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import cityFilterReducer from './cityFilterSlice';

export default combineReducers({
  weather: weatherReducer,
  filter: cityFilterReducer,
});
