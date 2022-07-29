import { createSlice } from '@reduxjs/toolkit';

const slicer = createSlice({
  name: 'cityFilter',
  initialState: '',
  reducers: {
    setCityFilter: (_, action) => action.payload,
  },
  extraReducers: {},
});

export const { setCityFilter } = slicer.actions;

export default slicer.reducer;
