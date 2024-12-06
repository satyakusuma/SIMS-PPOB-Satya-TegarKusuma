import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServices = createAsyncThunk('service/fetchServices', async (token, thunkAPI) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/services',
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

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.services = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = serviceSlice.actions;
export default serviceSlice.reducer;
