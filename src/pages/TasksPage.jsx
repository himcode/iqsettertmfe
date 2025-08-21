import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getTeamMembers } from "../utils/teamUtils";
import useAuth from "../hooks/useAuth";
import { getUserTasks } from "../api/service";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../features/tasks/tasksSlice";

const defaultTask = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  project_id: "",
  assigned_to: "",
  due_date: "",
};

const TasksPage = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState(defaultTask);
  const [newTask, setNewTask] = React.useState("");
  const [assignedUser, setAssignedUser] = React.useState("");
  const teamMembers = getTeamMembers();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

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
        ? new Date(task.due_date).toISOString().split("T")[0]
        : null,
        createdBy: user.id
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth>
              <InputLabel>Project</InputLabel>
              <Select
                label="Project"
                name="project_id"
                value={task.project_id}
                onChange={handleChange}
              >
                <MenuItem value="">None</MenuItem>
                {projects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Due Date"
              name="due_date"
              type="date"
              value={task.due_date}
              onChange={(e) => {
                // Always store in YYYY-MM-DD for input display
                setTask({ ...task, due_date: e.target.value });
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Task
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" mb={1}>
        Tasks
      </Typography>
      <List>
        {tasks
          .map((task) => (
            <ListItem key={task.id} divider>
              {
                task.title
              }
                
                
              
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default TasksPage;
