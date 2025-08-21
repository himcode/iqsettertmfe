import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  teamMembers: [],
  status: 'idle',
  error: null,
};

export const getTeamMembers = createAsyncThunk(
  'team/getTeamMembers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('/api/team', {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamMembers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTeamMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teamMembers = action.payload;
        state.error = null;
      })
      .addCase(getTeamMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
