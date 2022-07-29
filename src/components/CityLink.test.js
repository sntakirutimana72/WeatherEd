import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CityLink from './CityLink';

test('renders CityLink', () => {
  render(
    <BrowserRouter>
      <CityLink raw={{
        name: 'Alabama',
        country: 'US',
        latitude: -1783898,
        longitude: 4385943,
      }}
      />
    </BrowserRouter>,
  );
  expect(screen.getByRole('link')).toMatchSnapshot();
});
