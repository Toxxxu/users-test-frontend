import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
} from '@mui/material';
import { testsService } from '../../services/tests/tests.service';
import { useNavigate } from 'react-router-dom';

const CreateTestForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [numQuestions, setNumQuestions] = useState<number>(1);
  const [questions, setQuestions] = useState<string[]>(['']);
  const [numOptions, setNumOptions] = useState<number[]>([2]);
  const [correctOptions, setCorrectOptions] = useState<number[]>([0]);
  const [options, setOptions] = useState<string[][]>([['', '', '', '']]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setNumQuestions(numQuestions + 1);
    setQuestions([...questions, '']);
    setNumOptions([...numOptions, 2]);
    setCorrectOptions([...correctOptions, 0]);
    setOptions([...options, ['', '', '', '']]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (numQuestions > 1) {
      setNumQuestions(numQuestions - 1);
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);

      const updatedNumOptions = [...numOptions];
      updatedNumOptions.splice(index, 1);
      setNumOptions(updatedNumOptions);

      const updatedCorrectOptions = [...correctOptions];
      updatedCorrectOptions.splice(index, 1);
      setCorrectOptions(updatedCorrectOptions);

      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      setOptions(updatedOptions);
    }
  };

  const handleQuestionChange = (index: number, event: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = event;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index: number, event: string) => {
    const newValue = parseInt(event);

    if (newValue >= 0 && newValue <= numOptions[index] - 1) {
      const newCorrectOptions = [...correctOptions];
      newCorrectOptions[index] = newValue;
      setCorrectOptions(newCorrectOptions);
    }
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    event: string
  ) => {
    const newOptions = [...options];
    newOptions[questionIndex][optionIndex] = event;
    setOptions(newOptions);
  };

  const handleNumOptionsChange = (index: number, event: string) => {
    const newValue = parseInt(event);

    if (newValue >= 2 && newValue <= 4) {
      const newNumOptions = [...numOptions];
      newNumOptions[index] = newValue;
      setNumOptions(newNumOptions);

      const newCorrectOptions = [...correctOptions];
      if (newCorrectOptions[index] >= newValue) {
        newCorrectOptions[index] = newValue - 1;
      }
      setCorrectOptions(newCorrectOptions);
    }
  };

  const handleSubmit = async () => {
    const token: string = localStorage.getItem('token') || '';
    setLoading(true);

    try {
      const createTestRequest = {
        title,
        questions: questions.map((question, index) => ({
          question,
          options: options[index].slice(0, numOptions[index]),
          correctOption: correctOptions[index],
        })),
      };

      await testsService.createTest(createTestRequest, token);
      navigate('/');
    } catch (error) {
      console.error('Error creating test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Create a New Test
            </Typography>
            <TextField
              label="Test Title"
              fullWidth
              variant="outlined"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {Array.from({ length: numQuestions }).map((_, index) => (
              <div key={index}>
                <Typography variant="h6" align="center" gutterBottom>
                  Question {index + 1}
                </Typography>
                <TextField
                  label={`Question ${index + 1}`}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={questions[index]}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <TextField
                  label={`Correct Option for Question ${index + 1}`}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="number"
                  value={correctOptions[index]}
                  onChange={(e) =>
                    handleCorrectOptionChange(index, e.target.value)
                  }
                />
                <TextField
                  label={`Number of Options for Question ${index + 1}`}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="number"
                  value={numOptions[index]}
                  onChange={(e) => handleNumOptionsChange(index, e.target.value)}
                />
                <FormControl component="fieldset">
                  <Typography variant="subtitle1" gutterBottom>
                    Options for Question {index + 1}
                  </Typography>
                  {Array.from({ length: 4 }).map((option, optionIndex) => (
                    <TextField
                      key={optionIndex}
                      label={`Option ${optionIndex + 1}`}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={options[index][optionIndex]}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                      disabled={optionIndex >= numOptions[index]}
                    />
                  ))}
                </FormControl>
                <Button
                  variant="outlined"
                  onClick={() => handleRemoveQuestion(index)}
                  disabled={loading || numQuestions <= 1}
                >
                  Remove Question
                </Button>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={handleAddQuestion}
                disabled={loading}
              >
                Add Question
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                Create Test
              </Button>
            </div>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { CreateTestForm };
