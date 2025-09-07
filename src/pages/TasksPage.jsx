import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { getTeamMembers } from '../utils/teamUtils';
import useAuth from '../hooks/useAuth';
import { getUserTasks } from '../api/service';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/tasksSlice';

const defaultTask = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  project_id: '',
  assigned_to: '',
  due_date: '',
};

const TasksPage = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState(defaultTask);
  const [newTask, setNewTask] = React.useState('');
  const [assignedUser, setAssignedUser] = React.useState('');
  const teamMembers = getTeamMembers();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserTasks()
      .then((data) => setTasks(data))
      .catch(() => setTasks([]));
  }, []);

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTask = {
      ...task,
      due_date: task.due_date
        ? new Date(task.due_date).toISOString().split('T')[0]
        : null,
      createdBy: user.id,
    };

    // Dispatch createTask thunk to save to backend
    dispatch(createTask(formattedTask));
    setTask(defaultTask);
  };

  // TODO: Fetch projects and users for dropdowns
  const projects = [];
  const users = [{ id: user.id, name: user.name }];

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Create New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item size={4}>
            <TextField
              label="Title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item size={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={2}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={2}>
            <FormControl fullWidth={true}>
              <InputLabel>Assign To</InputLabel>
              <Select
                label="Assign To"
                name="assigned_to"
                value={task.assigned_to}
                onChange={handleChange}
              >
                <MenuItem value="">None</MenuItem>
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item size={4}>
            <TextField
              label="Due Date"
              name="due_date"
              type="date"
              value={task.due_date}
              onChange={(e) => {
                setTask({ ...task, due_date: e.target.value });
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item size={4}>
            <TextField
              label="Description"
              name="description"
              value={task.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item size={2}>
            <Button type="submit" variant="contained" color="primary">
              Create Task
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" mb={1}>
          Tasks
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tasks table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <a onClick={() => navigate(`/task/${row.id}`)}>
                      {row.title}{' '}
                    </a>
                  </TableCell>
                  <TableCell>
                    {row.status === 'todo'
                      ? 'To Do'
                      : row.status === 'in_progress'
                      ? 'In Progress'
                      : row.status === 'done'
                      ? 'Done'
                      : row.status}
                  </TableCell>
                  <TableCell>
                    {row.priority === '1' || row.priority === 1
                      ? 'Low'
                      : row.priority === '2' || row.priority === 2
                      ? 'Medium'
                      : row.priority === '3' || row.priority === 3
                      ? 'High'
                      : row.priority}
                  </TableCell>
                  <TableCell>{row.assigned_to || '-'}</TableCell>
                  <TableCell>
                    {row.due_date
                      ? new Date(row.due_date).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.created_at
                      ? new Date(row.created_at).toLocaleString()
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TasksPage;
