import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import projectsReducer from '../features/projects/projectsSlice'; // Import the projects reducer
import teamReducer from '../features/team/teamSlice'; // Import the team reducer
// Add more reducers as needed

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    projects: projectsReducer, // Add projects reducer to the store
    team: teamReducer, // Add team reducer to the store
  },
});

export default store;
