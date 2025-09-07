import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProject,
  getUserProjects,
} from '../features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';
// import { getTeamMembers } from '../features/team/teamSlice';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const defaultProject = {
  title: '',
  description: '',
  status: 'active',
  start_date: '',
  end_date: '',
  members: [],
};

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [project, setProject] = useState(defaultProject);
  const { projects } = useSelector((state) => state.projects);
  // const { teamMembers } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getUserProjects());
    // dispatch(getTeamMembers());
  }, [dispatch]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleMembersChange = (e) => {
    setProject({ ...project, members: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(project));
    setProject(defaultProject);
  };

  // const handleDelete = (id) => {
  //   dispatch(deleteProject(id));
  // };

  const handleEdit = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Create New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              name="title"
              value={project.title}
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
                value={project.status}
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="on_hold">On Hold</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={project.start_date || new Date()}
                onChange={(newDate) => {
                  setProject({ ...project, start_date: new Date(newDate) });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={project.end_date || new Date()}
                onChange={(newDate) => {
                  setProject({ ...project, end_date: new Date(newDate) });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Members</InputLabel>
              <Select
                label="Members"
                name="members"
                multiple
                value={project.members}
                onChange={handleMembersChange}
                input={<OutlinedInput label="Members" />}
                renderValue={(selected) =>
                  teamMembers
                    .filter((u) => selected.includes(u.id))
                    .map((u) => u.name)
                    .join(', ')
                }
              >
                {teamMembers.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    <ListItemIcon>
                      <Checkbox checked={project.members.indexOf(u.id) > -1} />
                    </ListItemIcon>
                    <ListItemText primary={`${u.name} (${u.email})`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={project.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Project
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" mb={1}>
        Projects
      </Typography>
      <List>
        {projects.map((p) => (
          <ListItem key={p.id} divider alignItems="flex-start">
            <ListItemText
              primary={p.title}
              secondary={
                <>
                  {`Status: ${p.status} | ${p.start_date} - ${p.end_date}`}
                  {Array.isArray(p.workflow) && p.workflow.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        Workflow:
                      </Typography>
                      {p.workflow.map((stage, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {idx + 1}. {stage}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </>
              }
            />

            <IconButton
              edge="end"
              onClick={() => handleEdit(p.id)}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            {/* <IconButton edge="end" onClick={() => handleDelete(p.id)}>
                <DeleteIcon />
              </IconButton> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProjectsPage;
