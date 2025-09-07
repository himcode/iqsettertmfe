import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Box, Toolbar } from '@mui/material';
import store from './app/store';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationProvider from './components/NotificationProvider';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import TasksPage from './pages/TasksPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectEditPage from './pages/ProjectEditPage';
import TeamPage from './pages/TeamPage';
import './App.css';
import AppLayout from './pages/AppLayout';
import TaskPage from './pages/TaskPage';

const AppContent = () => {
  const { accessToken } = useSelector((state) => state.auth);
  return (
    <NotificationProvider>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1, p: 1 }}>
            {accessToken && <AppLayout />}
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/task/:id"
                element={
                  <ProtectedRoute>
                    <TaskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <ProjectsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <ProtectedRoute>
                    <ProjectEditPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team"
                element={
                  <ProtectedRoute>
                    <TeamPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </NotificationProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
