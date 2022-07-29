import reducer, { setCityFilter } from './cityFilterSlice';

it('should update city display', () => {
  expect(reducer('', setCityFilter('alab'))).toBe('alab');
});
