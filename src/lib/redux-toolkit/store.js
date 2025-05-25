import { configureStore } from "@reduxjs/toolkit";
import todo from "./slices/todo-slice";
import modal from "./slices/modal-slice";
import auth from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    todo,
    modal,
    auth,
  },
});
