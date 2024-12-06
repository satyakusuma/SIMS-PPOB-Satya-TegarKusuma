import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initiateTransaction = createAsyncThunk('transaction/initiateTransaction', async ({ token, serviceCode, amount }, thunkAPI) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/transaction',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    data: JSON.stringify({ service_code: serviceCode, total_amount: amount })
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    message: '',
    isTransactionSuccess: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.message = '';
      state.isTransactionSuccess = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isTransactionSuccess = null;
      })
      .addCase(initiateTransaction.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isTransactionSuccess = true;
        state.loading = false;
      })
      .addCase(initiateTransaction.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isTransactionSuccess = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = transactionSlice.actions;
export default transactionSlice.reducer;
