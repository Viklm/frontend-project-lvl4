/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      state.channels = state.channels.filter(({ id }) => id !== payload);
    },
    renameChannel(state, { payload }) {
      const channel = state.channels.find((c) => c.id === payload.id);
      channel.name = payload.name;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
