import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFound = () => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
    <Typography variant="h3" color="textSecondary">404</Typography>
    <Typography variant="h5">Page Not Found</Typography>
  </Box>
);

export default NotFound;
