import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { Typography, Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import Loader from '../components/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();
  // const { tasks, status, error } = useSelector((state) => state.tasks);

  const [tasks, setTasks] = React.useState([]);
  


  useEffect(() => {
    // dispatch(fetchTasks());

  }, []);

  if (status === 'loading') return <Loader />;
  // if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>Dashboard</Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6">Tasks</Typography>
        <List>
          {tasks?.length === 0 ? (
            <ListItem><ListItemText primary="No tasks found." /></ListItem>
          ) : (
            tasks.map((task) => (
              <ListItem key={task.id} divider>
                <ListItemText primary={task.title} secondary={task.description} />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard;
