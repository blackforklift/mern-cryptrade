import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId:"643b3fd81273ec483576abdd",
 
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;

