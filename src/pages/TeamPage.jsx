import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const mockTeam = [
  {
    id: 1,
    name: 'Alice Smith',
    email: 'alice@example.com',
    tasks: ['Task 1', 'Task 2']
  },
  {
    id: 2,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    tasks: ['Task 3']
  }
];

const TeamPage = () => {
  // Replace mockTeam with Redux/API data
  return (
    <Box>
      <Typography variant="h5" mb={2}>Team Management</Typography>
      <Divider />
      <List>
        {mockTeam.map(member => (
          <ListItem key={member.id} alignItems="flex-start" divider>
            <ListItemText
              primary={`${member.name} (${member.email})`}
            />
            <div style={{ width: '100%' }}>
              <span style={{ fontWeight: 500, color: '#1976d2' }}>Tasks:</span>{' '}
              {member.tasks.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {member.tasks.map((task, idx) => <li key={idx}>{task}</li>)}
                </ul>
              ) : ' None'}
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TeamPage;
