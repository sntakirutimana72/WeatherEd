import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CityLink = ({ raw }) => {
  const {
    state, city, lon, lat,
  } = raw;
  return (
    <li>
      <Link to={`/city/state=${state}&city=${city}&lon=${lon}&lat=${lat}`}>
        {state}
      </Link>
    </li>
  );
};

CityLink.propTypes = {
  raw: PropTypes.shape({
    state: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    lon: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
  }).isRequired,
};

export default CityLink;
