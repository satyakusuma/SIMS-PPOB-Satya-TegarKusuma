import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (token, thunkAPI) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/profile',
    headers: { 
      'accept': 'application/json', 
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchBalance = createAsyncThunk('profile/fetchBalance', async (token, thunkAPI) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/balance',
    headers: { 
      'accept': 'application/json', 
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.request(config);
    return response.data.data.balance;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    balance: '',
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.profile = {};
      state.balance = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = profileSlice.actions;
export default profileSlice.reducer;
