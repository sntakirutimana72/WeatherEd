const homeEffects = ({ weather, filter }) => ({
  filter,
  status: weather.status,
  cities: weather.cities.filter(
    ({ name }) => name.toLowerCase().includes(filter.toLowerCase()),
  ),
});

export default homeEffects;
