export const getProjectWorkflow = createAsyncThunk(
  'projects/getProjectWorkflow',
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`/api/projects/project/${projectId}`,
        { headers: { Authorization: `Bearer ${auth.accessToken}` } });
      // Expecting { workflow: [...] }
      return response.data.workflow;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, ...projectData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`/api/projects/${id}`, projectData, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const getProjectById = createAsyncThunk(
  'projects/getProjectById',
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${auth.accessToken}` } });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  projects: [],
  status: 'idle',
  error: null,
  workflow: null,
  workflowStatus: 'idle',
  workflowError: null,
};

export const getUserProjects = createAsyncThunk(
  'projects/getUserProjects',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .addCase(getProjectWorkflow.pending, (state) => {
        state.workflowStatus = 'loading';
        state.workflowError = null;
        state.workflow = null;
      })
      .addCase(getProjectWorkflow.fulfilled, (state, action) => {
        state.workflowStatus = 'succeeded';
        state.workflow = action.payload;
        state.workflowError = null;
      })
      .addCase(getProjectWorkflow.rejected, (state, action) => {
        state.workflowStatus = 'failed';
        state.workflowError = action.payload;
        state.workflow = null;
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createProject = createAsyncThunk(
  'projects',
  async (projectData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('/api/projects', projectData, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return projectId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getUserProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        // Update the project in the array
        const idx = state.projects.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.projects[idx] = action.payload;
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        // Replace or add the fetched project in the projects array
        const idx = state.projects.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.projects[idx] = action.payload;
        } else {
          state.projects.push(action.payload);
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getProjectById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;