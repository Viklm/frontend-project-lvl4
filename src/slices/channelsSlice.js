/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannel: 1,
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
      if (payload === state.currentChannel) {
        const defaultChannel = state.channels[0].id;
        state.currentChannel = defaultChannel;
      }
    },
    renameChannel(state, { payload }) {
      const channel = state.channels.find((c) => c.id === payload.id);
      channel.name = payload.name;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannel = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
