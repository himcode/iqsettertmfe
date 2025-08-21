import axios from 'axios';

export const fetchProjectWorkflow = async (id, token) => {
  const response = await axios.get(`/api/projects/project/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data.workflow;
};
