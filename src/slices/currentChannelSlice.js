/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: 1,
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentChannel = payload;
    },
  },
});

export const { actions } = currentChannelSlice;
export default currentChannelSlice.reducer;
