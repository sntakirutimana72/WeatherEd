import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CityLink.module.css';

const CityLink = ({ raw }) => {
  const {
    name, country, latitude, longitude,
  } = raw;
  const city = `${name} - ${country}`;
  return (
    <li className={styles.CityLink}>
      <Link to={`/city/name=${city}&lat=${latitude}&lon=${longitude}`}>
        {name}
      </Link>
      <i className="fa fa-arrow-right" />
    </li>
  );
};

CityLink.propTypes = {
  raw: PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
  }).isRequired,
};

export default CityLink;
