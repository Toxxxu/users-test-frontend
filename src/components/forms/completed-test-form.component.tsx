import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { usersService } from '../../services/users/users.service';
import { GetUserTestResultDto } from '../../dto/tests/responses/completed/get-user-test-result.dto';

const CompletedTestForm: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [testResult, setTestResult] = useState<GetUserTestResultDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token: string = localStorage.getItem('token') || '';

    const fetchTestResult = async () => {
      try {
        const result = await usersService.getTestResult(testId ?? '', token);
        setTestResult(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test result:', error);
      }
    };

    fetchTestResult();
  }, [testId]);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="calc(100vh - 64px)">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {testResult?.title}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mark: {testResult?.mark.toFixed(1)}%
          </Typography>
          {testResult?.questions.map((question: any, index: number) => (
            <div key={index}>
              <Typography variant="subtitle1" gutterBottom>
                Question {index + 1}:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {question.question}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Your Answer: {question.chosenOption}
              </Typography>
              {question.status === 'correct' ? (
                <Typography variant="subtitle2" style={{ color: 'green' }}>
                  Correct Answer
                </Typography>
              ) : (
                <>
                  <Typography variant="subtitle2" style={{ color: 'red' }}>
                    Incorrect Answer
                  </Typography>
                  <Typography variant="subtitle2">
                    Correct Answer: {question.correctOption}
                  </Typography>
                </>
              )}
              <hr />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export { CompletedTestForm };
