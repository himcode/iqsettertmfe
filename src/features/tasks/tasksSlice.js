import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const getTaskById = createAsyncThunk(
  'tasks/getTaskById',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`/api/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${auth.accessToken}` } });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('/api/tasks', taskData, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`/api/task/${taskId}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
              // Replace or add the fetched task in the tasks array
              const idx = state.tasks.findIndex(t => t.id === action.payload.id);
              if (idx !== -1) {
                state.tasks[idx] = action.payload;
              } else {
                state.tasks.push(action.payload);
              }
              state.status = 'succeeded';
              state.error = null;
            })
            .addCase(getTaskById.pending, (state) => {
              state.status = 'loading';
              state.error = null;
            })
            .addCase(getTaskById.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.payload;
            });;
  },
});

export default tasksSlice.reducer;
