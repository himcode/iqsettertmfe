import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import {getTaskById } from '../features/tasks/tasksSlice';

const defaultTask = {
  title: '',
  description: '',
  status: '',
  priority: '',
  project_id: null,
  assigned_to: null,
  created_by: null,
  due_date: null,
  created_at: null,
};

const TaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.tasks.find(p => String(p.id) === String(id))) || defaultTask;
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!task || !task.id) {
      dispatch(getTaskById(id));
    }    
  }, [dispatch, id, accessToken]);

  console.log('Task:', task);

  // if (loading) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="60vh"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Box p={3}>
  //       <Typography color="error">Error: {error}</Typography>
  //     </Box>
  //   );
  // }

  if (!task) {
    return (
      <Box p={3}>
        <Typography>No task found.</Typography>
      </Box>
    );
  }
  

  return (
    <>
    {task.id}
    </>
    // <Box p={3}>
    //   <Paper elevation={2} sx={{ p: 3 }}>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} sm={6}>
    //         <TextField
    //           label="Title"
    //           name="title"
    //           value={form.title}
    //           onChange={handleChange}
    //           required
    //           fullWidth
    //         />
    //       </Grid>
    //       <Grid item xs={12} sm={6}>
    //         <FormControl fullWidth>
    //           <InputLabel>Status</InputLabel>
    //           <Select
    //             label="Status"
    //             name="status"
    //             value={form.status}
    //             onChange={handleChange}
    //           >
    //             <MenuItem value="active">Active</MenuItem>
    //             <MenuItem value="on_hold">On Hold</MenuItem>
    //             <MenuItem value="completed">Completed</MenuItem>
    //           </Select>
    //         </FormControl>
    //       </Grid>
    //       {/* <Grid item xs={12} sm={6}>
    //         <TextField
    //           label="Start Date"
    //           name="start_date"
    //           type="date"
    //           value={form.start_date}
    //           onChange={handleChange}
    //           InputLabelProps={{ shrink: true }}
    //           fullWidth
    //         />
    //       </Grid> */}
    //       {/* <Grid item xs={12} sm={6}>
    //         <TextField
    //           label="End Date"
    //           name="end_date"
    //           type="date"
    //           value={form.end_date}
    //           onChange={handleChange}
    //           InputLabelProps={{ shrink: true }}
    //           fullWidth
    //         />
    //       </Grid> */}
    //       {/* ...existing code for members... */}
    //       <Grid item xs={12}>
    //         <TextField
    //           label="Description"
    //           name="description"
    //           value={form.description}
    //           onChange={handleChange}
    //           multiline
    //           rows={3}
    //           fullWidth
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Button type="submit" variant="contained" color="primary">Save Changes</Button>
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // </Box>
  );
};

export default TaskPage;
