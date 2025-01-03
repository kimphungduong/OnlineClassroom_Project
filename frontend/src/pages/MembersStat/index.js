import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Pagination,
  LinearProgress,
} from "@mui/material";
import courseApi from "../../api/courseApi";

// Dữ liệu tĩnh
// const members = [
//   {
//     name: "Phan Hồng Phúc",
//     email: "phuc@gmail.com",
//     submissions: 2, // Số lần làm bài kiểm tra
//     totalTests: 3,  // Tổng số bài kiểm tra
//   },
//   {
//     name: "Dương Kim Phụng",
//     email: "Phung@gmail.com",
//     submissions: 1,
//     totalTests: 3,
//   },
//   {
//     name: "Lê Minh Quân",
//     email: "Quan@gmail.com",
//     submissions: 3,
//     totalTests: 3,
//   },
//   {
//     name: "Lê Minh Quân",
//     email: "Quan@gmail.com",
//     submissions: 3,
//     totalTests: 3,
//   },
//   {
//     name: "Lê Minh Quân",
//     email: "Quan@gmail.com",
//     submissions: 3,
//     totalTests: 3,
//   },
//   {
//     name: "Lê Minh Quân",
//     email: "Quan@gmail.com",
//     submissions: 3,
//     totalTests: 3,
//   },
//   {
//     name: "Lê Minh Quân",
//     email: "Quan@gmail.com",
//     submissions: 3,
//     totalTests: 3,
//   },
//   {
//     name: "Lê Minh Quân",
//     email: "Quan@gmail.com",
//     submissions: 3,
//     totalTests: 3,
//   },
// ];

const MembersStat = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;
  // const slug = 'lap-trinh-python';
  const { slug } = useParams(); 

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await courseApi.getStudentProgress(slug);
        console.log(response.data);
        setMembers(response.data);
        setFilteredMembers(response.data); // Set dữ liệu ban đầu
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(value)
    );
    setFilteredMembers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Danh sách thành viên
      </Typography>

      {/* Ô tìm kiếm */}
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          label="Tìm kiếm học sinh"
          size="small"
          onChange={handleSearch}
        />
      </Box>

      {/* Bảng danh sách thành viên */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Họ và tên</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tiến độ học tập</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentMembers.map((member, index) => {
              const progress = (member.lessonsCompleted / member.totalLessons) * 100;
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src="" alt="Avatar" />
                      {member.name}
                    </Box>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Typography variant="body2">
                        {`${member.lessonsCompleted}/${member.totalLessons}`}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        color="primary"
                        sx={{ width: "100%", height: 8, borderRadius: 5 }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredMembers.length / membersPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default MembersStat;
