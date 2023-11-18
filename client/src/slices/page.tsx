import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    index:number
  }
  
  const initialState: AuthState = {
    index:1,
  };

const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.index = action.payload.page;
        }
    },
});

export const { 
    setPage, 
} = pageSlice.actions;
export default pageSlice.reducer;