import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import axios from 'axios';
import QuestionComponent from './components/Question';
import { useLocation, useNavigate } from 'react-router-dom';
import questionApi from '~/api/questionApi';
import testApi from '~/api/testApi';

const TestNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [testName, setTestName] = useState('Assessment Title');
  const [timeLimit, setTimeLimit] = useState('');
  const [questions, setQuestions] = useState([]);
  const { sectionId, courseSlug } = location.state || {};

  const handleTestNameChange = (e) => setTestName(e.target.value);

  const handleTimeLimitChange = (e) => setTimeLimit(e.target.value);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { content: '', answerOptions: ['', '', '', ''], correctAnswer: '' , explanation: ''},
    ]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

    const handleCreateTest = async () => {
      try {
        // 1. Gửi các câu hỏi lên database
        alert(JSON.stringify(questions, null, 2));
        const questionResponses = await Promise.all(
          questions.map(async (question) => {
            const response = await questionApi.createQuestion(question);
            return response.data; // Return the saved question from the response
          })
        );
        // 2. Lấy danh sách ID của các câu hỏi đã lưu
        const questionIds = questionResponses.map((q) => q.question._id);
        alert(JSON.stringify(questionResponses, null, 2));
        // 3. Gửi API để tạo Test
        const payload = {
          name: testName,
          questions: questionIds,
        };
        alert(JSON.stringify(payload, null, 2));
        const testResponse = await testApi.createTest(courseSlug, sectionId, payload);
        
        alert('Test created successfully!');
        navigate(-1);
      } catch (error) {
        console.error('Error creating test:', error);
        alert('Failed to create test.');
      }
    };
    
  const deleteQuestion = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Create a Test
      </Typography>
      <Box mb={3}>
        <TextField
          variant="outlined"
          value={testName}
          onChange={handleTestNameChange}
          label="Assessment Title"
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={3} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          startIcon={<AddCircle />}
          onClick={addQuestion}
        >
          Add Question
        </Button>
      </Box>
      {questions.map((question, index) => (
        <QuestionComponent
          key={question._id || index}
          question={question}
          index={index}
          onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
          onDelete={deleteQuestion} // Truyền hàm xóa
        />
      ))}
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleCreateTest}>
          Create Test
        </Button>
      </Box>
    </Container>
  );
};

export default TestNew;
