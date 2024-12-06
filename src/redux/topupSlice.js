import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initiateTopup = createAsyncThunk('topup/initiateTopup', async ({ token, amount }, thunkAPI) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/topup',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data: JSON.stringify({ top_up_amount: amount })
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const topupSlice = createSlice({
  name: 'topup',
  initialState: {
    message: '',
    isTopupSuccess: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.message = '';
      state.isTopupSuccess = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateTopup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isTopupSuccess = null;
      })
      .addCase(initiateTopup.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isTopupSuccess = action.payload.status === 0;
        state.loading = false;
      })
      .addCase(initiateTopup.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isTopupSuccess = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = topupSlice.actions;
export default topupSlice.reducer;
