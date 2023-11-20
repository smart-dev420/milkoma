import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authServices from "../services/auth-services";
import { setMessage } from "./message";

//const user = JSON.parse(sessionStorage.getItem("user"));

export const login = createAsyncThunk(
    "auth/login", async ({ email, password }:any, thunkAPI) => {
        try {
            const data = await authServices.signIn({email, password});
            return data;
        } catch(err:any) {
            thunkAPI.dispatch(setMessage(err.message));
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

//export const logout = createAsyncThunk("auth/logout", async () => {
//  await AuthService.logout();
//});

interface AuthState {
    id: string;
    token: string;
    email: string;
    username: string;
    name: string;
    user: any;
    secretverify: boolean;
    secretcode: string;
    isLoggedIn: boolean;
    admin: boolean;
    region: number;
    logout: boolean;
  }
  
  const initialState: AuthState = {
    id: "",
    token: "",
    email: "",
    username: "",
    name: "",
    user: null,
    secretverify: false,
    secretcode: "",
    isLoggedIn: false,
    admin: false,
    region: 0,
    logout: false,
  };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signin: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        signout: () => initialState,
        setInfoBatch: (state, action) => {
            Object.assign(state, action.payload);
        },
        setRefCode: (state, action) => {
            state.secretcode = action.payload.secretcode
        },
        setUserEmail: (state, action) => {
            state.email = action.payload.email
        }
    },
});

export const { 
    signin, 
    signout, 
    setInfoBatch,
    setRefCode,
    setUserEmail
} = authSlice.actions;
export default authSlice.reducer;