import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CreateTestButton: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create-test"
      >
        Create Test
      </Button>
    </Box>
  );
};

export { CreateTestButton };
