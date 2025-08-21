import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Divider, OutlinedInput, Checkbox, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProject, getProjectById, getProjectWorkflow } from '../features/projects/projectsSlice';
// import { getTeamMembers } from '../features/team/teamSlice';

const defaultProject = {
  title: '',
  description: '',
  status: 'active',
  start_date: '',
  end_date: '',
  members: [],
};

const ProjectEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { teamMembers } = useSelector((state) => state.team);
  const project = useSelector((state) => state.projects.projects.find(p => String(p.id) === String(id))) || defaultProject;
  const workflow = useSelector((state) => state.projects.workflow);
  const workflowStatus = useSelector((state) => state.projects.workflowStatus);
  const workflowError = useSelector((state) => state.projects.workflowError);
  const [form, setForm] = useState(project);

  useEffect(() => {
    if (!project || !project.id) {
      dispatch(getProjectById(id));
    }
    dispatch(getProjectWorkflow(id));
    // dispatch(getTeamMembers());
  }, [dispatch, id]);

  useEffect(() => {
    setForm(project);
  }, [project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMembersChange = (e) => {
    setForm({ ...form, members: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject({ id, ...form }));
    navigate('/projects');
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>Edit Project</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
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
                value={form.status}
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="on_hold">On Hold</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="start_date"
              type="date"
              value={form.start_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="end_date"
              type="date"
              value={form.end_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          {/* ...existing code for members... */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Save Changes</Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" mb={1}>Project Workflow</Typography>
      {workflowStatus === 'loading' ? (
        <Typography color="text.secondary">Loading workflow...</Typography>
      ) : workflowError ? (
        <Typography color="error">{workflowError}</Typography>
      ) : Array.isArray(workflow) ? (
        <Box>
          {workflow.map((step, idx) => (
            <Box key={idx} sx={{ mb: 1, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
              <Typography variant="subtitle2">Step {idx + 1}</Typography>
              <Typography>{step}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography color="text.secondary">No workflow data.</Typography>
      )}
    </Box>
  );
};

export default ProjectEditPage;
