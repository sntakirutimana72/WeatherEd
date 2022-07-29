const API_ID = '7e1c2afc7d1aaf38616fd7dfe83427ef';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export const getWeatherStats = (lon, lat) => fetch(
  `${API_URL}lat=${lat}&lon=${lon}&appid=${API_ID}`,
).then(
  (response) => response.json(),
).then(
  (data) => data,
);

export const getCities = () => fetch(
  'https://api.api-ninjas.com/v1/city?country=US&limit=100',
  {
    method: 'GET',
    headers: { 'X-Api-Key': 'FJ/oCRaNAy12WLCv26g1hg==mrmFYXJNUb4MNlNM' },
    contentType: 'application/json',
  },
).then(
  (response) => response.json(),
).then(
  (data) => data,
);
