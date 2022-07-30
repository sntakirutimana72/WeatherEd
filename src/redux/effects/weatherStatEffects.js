export const getStats = (name) => ({ weather }) => weather.stats.find((stat) => stat.name === name);

export const fetchStatEffect = ({
  wind, weather, main, visibility,
}) => ({
  icon: weather[0].icon,
  main: weather[0].main,
  details: {
    'Wind degree': wind.deg,
    'Wind speed': wind.speed,
    Humidity: main.humidity,
    Pressure: main.pressure,
    Temperature: main.temp,
    Visibility: visibility,
  },
});

export const fetchPendingEffect = (state, { name }) => {
  const { stats } = state;
  const prevStat = stats.find((stat) => stat.name === name);
  const newStat = (
    prevStat
      ? {
        ...prevStat,
        status: 'pending',
      }
      : {
        name,
        status: 'pending',
      }
  );
  const newStats = (
    prevStat ? stats.map((stat) => (
      stat.name === name
        ? newStat
        : stat
    )) : [...stats, newStat]
  );
  return { ...state, stats: newStats };
};
