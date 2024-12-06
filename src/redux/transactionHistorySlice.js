import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTransactionHistory = createAsyncThunk(
  'transactionHistory/fetchTransactionHistory',
  async ({ token, offset = 0, limit = 5 }, thunkAPI) => {
    const config = {
      method: 'get',
      url: `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`,
      headers: { 
        'accept': 'application/json', 
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.request(config);
      return response.data.data.records;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const transactionHistorySlice = createSlice({
  name: 'transactionHistory',
  initialState: {
    transactions: [],
    offset: 0,
    limit: 5,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.transactions = [];
      state.offset = 0;
      state.limit = 5;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
    increaseOffset: (state) => {
      state.offset += state.limit;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        if (state.offset === 0) {
          state.transactions = action.payload;
        } else {
          state.transactions = [...state.transactions, ...action.payload];
        }
        state.hasMore = action.payload.length === state.limit;
        state.loading = false;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState, increaseOffset } = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;