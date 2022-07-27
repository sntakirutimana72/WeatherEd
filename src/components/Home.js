import { useState } from 'react';
import { v4 as uid } from 'uuid';
import CityLink from './CityLink';
import datapoints from '../apis/datapoints';

import styles from './Home.module.css';

const Home = () => {
  const [filter, setFilter] = useState('');

  const onFilterChange = ({ target }) => setFilter(target.value);
  const getFiltered = () => {
    const keyword = filter.trim().toLowerCase();
    return keyword ? datapoints.filter(
      ({ state }) => state.toLowerCase().includes(keyword),
    ) : datapoints;
  };
  const filtered = getFiltered();

  return (
    <div>
      <form>
        <input
          name="filter"
          value={filter}
          onChange={onFilterChange}
          className={styles.Filter}
          placeholder="Search"
        />
      </form>
      <ul>
        {filtered.map((raw) => <CityLink key={uid()} raw={raw} />)}
      </ul>
    </div>
  );
};

export default Home;
