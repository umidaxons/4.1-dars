import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    addTodo(state, action) {
      state.data.push(action.payload);
    },
    deleteTodo(state, action) {
      state.data = state.data.filter(todo => todo.id !== action.payload);
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setData, addTodo, deleteTodo, setError } = todoSlice.actions;
export default todoSlice.reducer;
