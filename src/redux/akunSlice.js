import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfile = createAsyncThunk('akun/fetchProfile', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  let config = {
    method: 'get',
    url: 'https://take-home-test-api.nutech-integrasi.com/profile',
    headers: { 'Authorization': `Bearer ${token}` }
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editProfileAsync = createAsyncThunk('akun/editProfileAsync', async (updatedProfileData, thunkAPI) => {
  const token = localStorage.getItem('token');
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/profile/update',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: JSON.stringify(updatedProfileData)
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editProfileImageAsync = createAsyncThunk('akun/editProfileImageAsync', async (formData, thunkAPI) => {
  const token = localStorage.getItem('token');
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'https://take-home-test-api.nutech-integrasi.com/profile/image',
    headers: { 'Authorization': `Bearer ${token}` },
    data: formData
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const akunSlice = createSlice({
  name: 'akun',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.data = null;
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
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.loading = false;
      })
      .addCase(editProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProfileImageAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfileImageAsync.fulfilled, (state, action) => {
        state.data = { ...state.data, profile_image: action.payload.profile_image };
        state.loading = false;
      })
      .addCase(editProfileImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = akunSlice.actions;
export default akunSlice.reducer;
