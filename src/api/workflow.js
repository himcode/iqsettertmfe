import axios from 'axios';

export const fetchWorkflowStages = async (projectId, token) => {
  const response = await axios.get(`/api/projects/${projectId}/workflow-stages`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  console.log('Workflow stages fetched:', response.data);
  return response.data;
};
