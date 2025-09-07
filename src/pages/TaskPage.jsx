import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

const TaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { task, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (id) {
      alert(id);
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!task) {
    return (
      <Box p={3}>
        <Typography>No task found.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Status: {task.status}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {task.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Assigned to: {task.assignee?.name || 'Unassigned'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due date:{' '}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TaskPage;
