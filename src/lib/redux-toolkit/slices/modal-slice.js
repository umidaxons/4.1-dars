import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addModal: false,
  loginErrorModal: false,  
  loginFormModal: false,  
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAddModal(state) {
      state.addModal = !state.addModal;
    },
    setLoginErrorModal(state) {
      state.loginErrorModal = !state.loginErrorModal;
    },
    setLoginFormModal(state) {
      state.loginFormModal = !state.loginFormModal;
    },
    closeAllModals(state) {
      state.addModal = false;
      state.loginErrorModal = false;
      state.loginFormModal = false;
    }
  },
});

export const { setAddModal, setLoginErrorModal, setLoginFormModal, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;
