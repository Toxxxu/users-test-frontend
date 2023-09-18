import React from 'react'
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useTests } from '../hooks/tests/unauthorized/useTests';

const ViewAllTests: React.FC = () => {
  const getData = useTests();
  const tests = getData.tests;
  const loading = getData.loading;

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
        Tests created by users
      </Typography><Grid container spacing={2}>
        {tests.map((test) => (
          <Grid item key={test._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {test.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export { ViewAllTests };
