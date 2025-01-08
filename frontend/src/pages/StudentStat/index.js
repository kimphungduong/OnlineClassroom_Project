import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import coursenApi from '~/api/courseApi';

// Đăng ký các thành phần của biểu đồ
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentStat = () => {
  const { slug, studentId } = useParams();
  const [tests, setTests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dữ liệu biểu đồ 1: Điểm số trung bình của mỗi bài kiểm tra
  const averageScoresChartData = tests ? {
    labels: tests.map((test) => test.name),
    datasets: [
      {
        label: "Điểm số trung bình",
        data: tests.map((test) => {
          const totalScore = test.submission.reduce((acc, submission) => acc + submission.score, 0);
          const averageScore = totalScore / test.submission.length;
          return averageScore;
        }),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgb(0, 99, 248)",
        borderWidth: 1,
      },
    ],
  } : {};

  // Dữ liệu biểu đồ 2: Số lần làm bài
  const attemptsChartData = tests ? {
    labels: tests.map((test) => test.name),
    datasets: [
      {
        label: "Số lần làm bài",
        data: tests.map((test) => test.submission.length), // Số lần làm bài = số submissions
        backgroundColor: "rgba(153, 102, 255, 0.8)",
        borderColor: "rgb(0, 114, 34)",
        borderWidth: 1,
      },
    ],
  } : {};

  const chartOptions1 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,  // Đảm bảo trục Y bắt đầu từ 0
        ticks: {
          min: 10,            // Đặt giá trị tối thiểu cho trục Y là 10
          stepSize: 1,        // Đặt bước nhảy cho trục Y là 1
        },
        min: 0,
        max: 100,
      },
    },
  };
  const chartOptions2 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,  // Đảm bảo trục Y bắt đầu từ 0
        ticks: {
          min: 10,            // Đặt giá trị tối thiểu cho trục Y là 10
          stepSize: 1,        // Đặt bước nhảy cho trục Y là 1
        },
        min: 0,
        max: 10,
      },
    },
    
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await coursenApi.getSubmission(slug, studentId);
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        console.log(response.data);
        setTests(response.data); // Lưu dữ liệu bài kiểm tra vào state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [slug, studentId]); // Chạy lại khi slug hoặc studentId thay đổi

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5">Đang tải dữ liệu...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" color="error">
          Lỗi: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Thông tin chi tiết học sinh
      </Typography>
      {/* Giả sử bạn có thông tin học sinh khác trong response */}
      <Typography variant="body1">
        <strong>Họ và tên:</strong> {tests[0]?.studentName} {/* Hiển thị tên học sinh từ bài kiểm tra đầu tiên */}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        <strong>Email:</strong> {tests[0]?.email} {/* Hiển thị email từ bài kiểm tra đầu tiên */}
      </Typography>

      {/* Biểu đồ 1: Điểm số trung bình */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Biểu đồ điểm kiểm tra
      </Typography>
      <Bar data={averageScoresChartData} options={chartOptions1} />

      {/* Biểu đồ 2: Số lần làm bài */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Biểu đồ số lần làm bài
      </Typography>
      <Bar data={attemptsChartData} options={chartOptions2} />
    </Container>
  );
};

export default StudentStat;
