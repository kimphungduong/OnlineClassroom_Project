import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import testApi from "~/api/testApi";
import { useParams } from "react-router-dom";
import courseApi from "~/api/courseApi";

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null); // State để lưu bài test
  const [answers, setAnswers] = useState({});
  const [elapsedTime, setElapsedTime] = useState(0); // Timer for elapsed time
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái tải dữ liệu
  const { slug, testId} = useParams();
 
  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {

        const response = await testApi.getTest(slug, testId);
        //  axios.get(
        //   `http://localhost:5000/api/course/${slug}/test/${testId}`
        // );
        setQuizData(response.data); // Lưu dữ liệu test vào state
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy data:", error);
        alert("Lỗi khi lấy data.");
      }
    };

    fetchQuiz();
  }, [slug, testId]);

  const calculateScore = () => {
    let score = 0;
    quizData.questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        score += 1;
      }
    });
    return (score * 100) / quizData.questions.length;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const score = calculateScore();

    const submissionData = {
      test: testId,
      score,
      timeSpent: elapsedTime,
    };
    console.log("Submission Data:", submissionData);
    try {
      const response = await testApi.addSubmission(slug, testId, submissionData);
      // axios.put(
      //   `http://localhost:5000/api/course/${slug}/test/${testId}/submission`,
      //   submissionData
      // );
      courseApi.markLessonAsCompleted(testId);
      console.log("API Response:", response.data);
      alert(`Nộp bài thành công! Số điểm đạt được: ${score}%`);
    } catch (error) {
      console.error("Lỗi nộp bài:", error);
      alert("Có lỗi xảy ra.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6">Loading quiz...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        {quizData.name}
      </Typography>

      {/* Timer */}
      <Typography variant="h6" color="secondary" gutterBottom>
        Thời gian: {formatTime(elapsedTime)}
      </Typography>

      {/* Questions */}
      {quizData.questions.map((question, index) => (
        <Card key={question._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Câu hỏi {index + 1}: {question.content}
            </Typography>

            <RadioGroup
              value={answers[question._id] || ""}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            >
              {question.answerOptions.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 4 }}
      >
        Nội bài
      </Button>
    </Container>
  );
};

export default QuizPage;
