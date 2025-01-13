import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(credentials, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials, {
                withCredentials:true,
            });
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, data);
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name : "auth",
    initialState: {
        user: null,
        isAuthenticated:false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state,action) => {
                state.error = null;
            })
            .addCase(registerUser.rejected, (state,action) => {
                state.error = action.payload;
            });
    },
});


export const {logout} = authSlice.actions;

export default authSlice.reducer;