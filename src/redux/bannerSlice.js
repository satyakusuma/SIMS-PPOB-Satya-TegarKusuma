import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBanners = createAsyncThunk('banner/fetchBanners', async (token, thunkAPI) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/banner',
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

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.banners = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = bannerSlice.actions;
export default bannerSlice.reducer;
