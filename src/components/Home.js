import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uid } from 'uuid';
import CityLink from './CityLink';
import DotsProgressBar from './DotsProgressBar';
import homeEffects from '../redux/effects/commonEffects';
import { fetchCities } from '../redux/features/weatherSlice';
import { setCityFilter } from '../redux/features/cityFilterSlice';

import styles from './Home.module.css';

const Home = () => {
  const { cities, filter, status } = useSelector(homeEffects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCities());
  }, []);

  const onChange = ({ target }) => {
    dispatch(setCityFilter(target.value));
  };
  const reload = () => {
    dispatch(fetchCities());
  };
  const loading = ['idle', 'pending'].includes(status);
  const success = status === 'fulfilled';

  return (
    <>
      {loading && (<DotsProgressBar />)}
      {status === 'failed' && (
        <button
          type="button"
          onClick={reload}
          aria-label="retry"
          className="fa fa-refresh retryButton"
        />
      )}
      {success && (
        <div className={styles.Home}>
          <form>
            <input
              name="filter"
              value={filter}
              className={styles.Keyword}
              onChange={onChange}
              placeholder="Search"
            />
          </form>
          <div className={styles.MainInfo}>
            <h2>UNITED STATES OF AMERICA</h2>
          </div>
          <div className={styles.States}>
            <h3>STATS BY STATE</h3>
            <ul>
              {cities.map((raw) => <CityLink key={uid()} raw={raw} />)}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
