import React from 'react';
import { Box, TextField, Typography, Grid, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const QuestionComponent = ({ question, index, onUpdate, onDelete }) => {
  const handleContentChange = (e) => {
    onUpdate({ ...question, content: e.target.value });
  };

  const handleOptionChange = (optionIndex, value) => {
    const updatedOptions = [...question.answerOptions];
    updatedOptions[optionIndex] = value;
    onUpdate({ ...question, answerOptions: updatedOptions });
  };

  const handleCorrectAnswerChange = (e) => {
    onUpdate({ ...question, correctAnswer: e.target.value });
  };

  const handleExplanationChange = (e) => {
    onUpdate({ ...question, explanation: e.target.value });
  };

  return (
    <Box mb={3} p={2} border={1} borderColor="grey.300" borderRadius={2}>
      <Typography variant="h6" sx={{ mb: 2 }}>Question No: {index + 1}</Typography>
      <TextField
        fullWidth
        label="Question Content"
        value={question.content}
        onChange={handleContentChange}
        placeholder="Enter question content"
        sx={{ mb: 3 }}
      />
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Answers:</Typography>
      {question.answerOptions.map((option, optionIndex) => (
        <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }} key={optionIndex}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              label={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
              placeholder={`Enter option ${optionIndex + 1}`}
            />
          </Grid>
          <Grid item xs={2}>
            <RadioGroup
              value={question.correctAnswer}
              onChange={handleCorrectAnswerChange}
            >
              <FormControlLabel
                value={option}
                control={<Radio />}
                label="Correct"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      ))}
      <TextField
        fullWidth
        label="Explanation"
        value={question.explanation}
        onChange={handleExplanationChange}
        placeholder="Enter explanation for the question"
        sx={{ mt: 3 }}
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(index)} // Gọi callback để xóa câu hỏi
        >
          Delete Question
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionComponent;
