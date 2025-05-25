import { configureStore } from "@reduxjs/toolkit";
import todo from "./slices/todo-slice.js";
import modal from "./slices/modal-slice.js";
import auth from "./slices/auth-slice.js";

export const store = configureStore({
  reducer: {
    todo,
    modal,
    auth,
  },
});
