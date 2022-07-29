import { WEATHER_API_ID, NINJA_API_ID } from './appIds';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export const getWeatherStats = (lon, lat) => fetch(
  `${API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_ID}`,
).then(
  (response) => response.json(),
).then(
  (data) => data,
);

export const getCities = () => fetch(
  'https://api.api-ninjas.com/v1/city?country=US&limit=100',
  {
    method: 'GET',
    headers: { 'X-Api-Key': NINJA_API_ID },
    contentType: 'application/json',
  },
).then(
  (response) => response.json(),
).then(
  (data) => data,
);
