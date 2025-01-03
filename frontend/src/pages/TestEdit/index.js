import React, { useState, useEffect } from 'react';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import axios from 'axios';
import QuestionComponent from './components/Question';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import testApi from '~/api/testApi';
import questionApi from '~/api/questionApi';
const TestEdit = () => {
  const { testId, courseSlug } = useParams();  // Receive state from navigation
  const navigate = useNavigate();
  const [testName, setTestName] = useState('');
  const [questions, setQuestions] = useState([]);

  // Fetch test data when component mounts
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        
        if (!testId) {
          console.error('No Id provided');

          return;
        }
        const response = await testApi.getTest(courseSlug, testId);
        const testData = response.data;
        
        // Update state with fetched data
        setTestName(testData.name || '');
        setQuestions(testData.questions || []);
        console.log('Fetched Test Data:', testData);
      } catch (error) {
        console.error('Error fetching test data:', error);
        alert('Failed to fetch test data. Please try again later.');
      }
    };

    fetchTestData();
  }, [courseSlug, testId]);

  // Handlers for form input changes
  const handleTestNameChange = (e) => setTestName(e.target.value);

  // Add a new empty question to the list
  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { content: '', answerOptions: ['', '', '', ''], correctAnswer: '', explanation: '' },
    ]);
  };

  // Update a specific question in the list
  const updateQuestion = (index, updatedQuestion) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = updatedQuestion;
      return newQuestions;
    });
  };

  // Save updates to the test
  const handleUpdateTest = async () => {
    try {
      // Update or create questions
      const questionResponses = await Promise.all(
        questions.map(async (question) => {
          if (question._id) {
            // Update existing question
            await questionApi.updateQuestion(question._id, question);
            return question;
          } else {
            // Create new question
            const response = await questionApi.createQuestion(question);
            return response.data.question; // Get created question data
          }
        })
      );

      // Get the updated list of question IDs
      const questionIds = questionResponses.map((q) => q._id);

      // Update the test details
      const payload = {
        name: testName,
        questions: questionIds,
      };

      await testApi.updateTest(courseSlug, testId, payload); 
      
      alert('Test updated successfully!');
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error updating test:', error);
      alert('Failed to update the test. Please try again.');
    }
  };
  const deleteQuestion = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Edit Test
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
        <Button variant="outlined" startIcon={<AddCircle />} onClick={addQuestion}>
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
        <Button variant="contained" color="primary" onClick={handleUpdateTest}>
          Update Test
        </Button>
      </Box>
    </Container>
  );
};

export default TestEdit;
