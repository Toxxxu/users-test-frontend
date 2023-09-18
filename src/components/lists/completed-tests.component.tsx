import React from 'react';
import { useTests } from '../hooks/tests/authorized/useTests';
import { Box, Card, CardContent, CircularProgress, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const CompletedTests: React.FC = () => {
  const getData = useTests();
  const tests = getData.completedTests;
  const loading = getData.loading;
  const username = localStorage.getItem('username');

  if (loading) {
    return (
      <Grid container alignItems="center" justifyContent="center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Box>
          <CircularProgress />
        </Box>
      </Grid>
    );
  }

  if (tests.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Completed tests by {username}
      </Typography>
      <Grid container spacing={2}>
        {tests.map((test) => (
          <Grid item key={test._id} xs={12} sm={6} md={4}>
            <Card sx={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent style={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxHeight: '2.4em' }}>
                  {test.title}
                </Typography>
              </CardContent>
              <MuiLink component={Link} to={`/completed-test/${test._id}`} color="primary" underline="hover" style={{ textAlign: 'right', paddingRight: '16px' }}>
                View Details
              </MuiLink>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export { CompletedTests };
