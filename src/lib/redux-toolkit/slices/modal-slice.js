import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    addTodoOpen: false,
    loginOpen: false,
  },
  reducers: {
    openAddModal(state) {
      state.addTodoOpen = true;
      state.loginOpen = false;
    },
    closeAddModal(state) {
      state.addTodoOpen = false;
    },
    openLoginModal(state) {
      state.loginOpen = true;
      state.addTodoOpen = false;
    },
    closeLoginModal(state) {
      state.loginOpen = false;
    },
  },
});

export const { openAddModal, closeAddModal, openLoginModal, closeLoginModal } = modalSlice.actions;
export default modalSlice.reducer;
