import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export const registerUser = createAsyncThunk('registration/registerUser', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_ENDPOINTS.REGISTER, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    let errorMsg = 'Registration failed';
    if (error.response) {
      errorMsg = error.response.data.message || errorMsg;
    }
    return rejectWithValue(errorMsg);
  }
});

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = registrationSlice.actions;

export default registrationSlice.reducer;
