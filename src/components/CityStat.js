import { useParams } from 'react-router-dom';

const CityStat = () => {
  const { state } = useParams();

  return (
    <div>
      <div>
        <img src="" alt={state} />
        <h2>{state}</h2>
      </div>
    </div>
  );
};

export default CityStat;
