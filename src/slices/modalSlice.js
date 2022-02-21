/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    type: null,
    item: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setHiddenModal(state) {
      state.modal.type = null;
      state.modal.item = null;
    },
    setShowModal(state, { payload }) {
      state.modal.type = payload.type;
      state.modal.item = payload.item || null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
