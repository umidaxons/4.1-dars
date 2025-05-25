import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const { setLoading, setData, setError } = todoSlice.actions;
export default todoSlice.reducer;
