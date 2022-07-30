import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { v4 as uid } from 'uuid';
import DotsProgressBar from './DotsProgressBar';
import { fetchWeatherStats } from '../redux/features/weatherSlice';
import { getStats } from '../redux/effects/weatherStatEffects';

import styles from './CityStat.module.css';

const CityStat = () => {
  const { name, lon, lat } = useParams();
  const stats = useSelector(getStats(name));
  const dispatch = useDispatch();

  const triggerReload = () => dispatch(fetchWeatherStats(name, lon, lat));

  useEffect(() => {
    if (!stats) {
      triggerReload();
    }
  }, []);

  const isLoading = !stats || stats.status === 'pending';
  const failure = stats && stats.status === 'failed';
  const success = stats && stats.status === 'fulfilled';
  const [city, country] = name.split(' - ');

  return (
    <div className={styles.CityStat}>
      <div className={styles.Back}>
        <Link to="/"><i className="fa fa-arrow-left" /></Link>
        <h1>{city}</h1>
      </div>
      {isLoading && <DotsProgressBar />}
      {failure && (
        <button
          type="button"
          onClick={triggerReload}
          aria-label="retry"
          className="fa fa-refresh retryButton"
        />
      )}
      {success && (
        <div>
          <div className={styles.StatDesc}>
            <h2>
              {city}
              <br />
              {country}
            </h2>
            <div>
              <img
                src={`http://openweathermap.org/img/w/${stats.icon}.png`}
                alt={city}
              />
              <span>{stats.main}</span>
            </div>
          </div>
          {Object.entries(stats.details).map(([key, value]) => (
            <div key={uid()} className={styles.StatInfo}>
              <span>{key}</span>
              <span />
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityStat;
