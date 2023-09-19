import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CircularProgress, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { testsService } from '../../services/tests/tests.service';
import { Test } from '../../models/Test.model';
import { DoTestRequestDto } from '../../dto/tests/requests/do-test-request.dto';
import { usersService } from '../../services/users/users.service';

const TestViewForm: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<DoTestRequestDto[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token: string = localStorage.getItem('token') || '';

    const fetchTest = async () => {
      try {
        const test = await testsService.findTest(testId ?? '', token);
        setTest(test);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [testId]);

  const handleSelectAnswer = (questionIndex: number, selectedOption: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = {
      question: test?.questions[questionIndex].question ?? '',
      chosenOption: selectedOption,
    };
    console.log(updatedAnswers);
    setSelectedAnswers(updatedAnswers);
  };

  const handleDoTest = async () => {
    const token: string = localStorage.getItem('token') || '';

    if (selectedAnswers.length !== test?.questions.length) {
      alert('Please answer all questions before submitting the test.');
      return;
    }

    try {
      await usersService.doTestById(testId ?? '', selectedAnswers, token);
      navigate('/');
    } catch (error) {
      console.error('Error submitting the test:', error);
    }
  }

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="calc(100vh - 64px)">
        <CircularProgress />
      </Box>
    );
  }

  if (!test) {
    return (
      <Typography variant="h6" align="center">
        Test not found.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {test.title}
      </Typography>
      <Card>
        <CardContent>
          <div>
            <Typography variant="h6" align="center" gutterBottom>
              Questions:
            </Typography>
            {test.questions.map((question: any, index: number) => (
              <div key={index}>
                <Typography variant="body1">
                  {index + 1}. {question.question}
                </Typography>
                <RadioGroup
                  name={`question-${index}`}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  value={selectedAnswers[index]?.chosenOption ?? ''}
                  onChange={(event) => handleSelectAnswer(index, parseInt(event.target.value))}
                >
                  {question.options.map((option: string, optionIndex: number) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex.toString()}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Box display="flex" justifyContent="center">
              <Button variant="contained" onClick={handleDoTest}>
                Submit Test
              </Button>
            </Box>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { TestViewForm };
