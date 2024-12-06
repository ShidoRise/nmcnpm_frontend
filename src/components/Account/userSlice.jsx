import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state của người dùng
const initialState = {
    user: {
        name: "",
        number: "",
        address: "",
        username: "",
    },
    status: 'idle',
    error: null,
};

// Thunk để fetch thông tin người dùng từ API
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axios.get('/api/user');
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        updateUser(state, action) {
            state.user = {
                ...state.user,
                ...action.payload
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
