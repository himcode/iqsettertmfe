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
  OutlinedInput,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  updateProject,
  getProjectById,
} from '../features/projects/projectsSlice';
import { fetchWorkflowStages } from '../api/workflow';
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
  workflow: [],
};

const ProjectEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { teamMembers } = useSelector((state) => state.team);
  const project =
    useSelector((state) =>
      state.projects.projects.find((p) => String(p.id) === String(id)),
    ) || defaultProject;
  console.log('Loaded project:', project);
  // Use workflow from project object if present
  const [form, setForm] = useState(project);
  const [workflow, setWorkflow] = useState([]);
  const [workflowLoading, setWorkflowLoading] = useState(false);
  const [workflowError, setWorkflowError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!project || !project.id) {
      const result = dispatch(getProjectById(id));
      console.log(result);
    }
    // dispatch(getTeamMembers());
    // Fetch workflow stages for this project
    const fetchWorkflow = async () => {
      setWorkflowLoading(true);
      setWorkflowError(null);
      try {
        const data = await fetchWorkflowStages(id, accessToken);
        console.log('Fetched workflow stages:', data);
        setWorkflow(data);
      } catch (err) {
        setWorkflowError(err.message || 'Failed to load workflow');
      } finally {
        setWorkflowLoading(false);
      }
    };
    fetchWorkflow();
  }, [dispatch, id, accessToken]);

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
      <Typography variant="h5" mb={2}>
        Edit Project
      </Typography>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={
                  form.start_date ? new Date(form?.start_date) : new Date()
                }
                onChange={(newDate) => {
                  setForm({ ...form, start_date: new Date(newDate) });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={form.end_date ? new Date(form.end_date) : new Date()}
                onChange={(newDate) => {
                  setForm({ ...form, end_date: new Date(newDate) });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" mb={1}>
        Project Workflow
      </Typography>
      {workflowLoading ? (
        <Typography color="text.secondary">Loading workflow...</Typography>
      ) : workflowError ? (
        <Typography color="error">{workflowError}</Typography>
      ) : Array.isArray(workflow) && workflow.length > 0 ? (
        <Box>
          {workflow.map((step, idx) => (
            <Box
              key={step.id || idx}
              sx={{ mb: 1, p: 1, border: '1px solid #eee', borderRadius: 1 }}
            >
              <Typography variant="subtitle2">
                Step {idx + 1}: {step.name}
              </Typography>
              {/* Optionally show more details: */}
              {/* <Typography color="text.secondary">Order: {step.stage_order}</Typography> */}
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
