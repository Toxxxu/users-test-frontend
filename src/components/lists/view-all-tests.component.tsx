import React, { useEffect, useState } from 'react'
import { Test } from '../../models/Test.model';
import { testsService } from '../../services/tests/tests.service';
import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

const ViewAllTests: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const tests = await testsService.findAllTests();
        setTests(tests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
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
      )}
    </div>
  )
}

export { ViewAllTests };
