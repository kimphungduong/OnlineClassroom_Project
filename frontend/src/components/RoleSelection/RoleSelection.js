import React from "react";
import { Box, Typography } from "@mui/material";

const RoleSelection = ({ role, onChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
      {/* Học sinh */}
      <Box
        onClick={() => onChange({ target: { value: "student" } })}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: 2,
          borderRadius: 1,
          border: role === "student" ? "2px solid #1976d2" : "2px solid transparent",
          backgroundColor: role === "student" ? "#e3f2fd" : "transparent",
          marginRight: 2,
        }}
      >
        <img
          src="/assets/images/icon_student.png" // Đường dẫn đến icon học sinh
          alt="Học sinh"
          width="24"
          style={{
            marginRight: 8,
            filter: role === "student" ? "none" : "grayscale(100%)",
          }}
        />
        <Typography
          sx={{
            color: role === "student" ? "#000" : "#aaa",
            fontWeight: role === "student" ? "bold" : "normal",
          }}
        >
          Học sinh
        </Typography>
      </Box>

      {/* Giáo viên */}
      <Box
        onClick={() => onChange({ target: { value: "teacher" } })}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: 2,
          borderRadius: 1,
          border: role === "teacher" ? "2px solid #1976d2" : "2px solid transparent",
          backgroundColor: role === "teacher" ? "#e3f2fd" : "transparent",
        }}
      >
        <img
          src="/assets/images/icon_teacher.png" // Đường dẫn đến icon giáo viên
          alt="Giáo viên"
          width="24"
          style={{
            marginRight: 8,
            filter: role === "teacher" ? "none" : "grayscale(100%)",
          }}
        />
        <Typography
          sx={{
            color: role === "teacher" ? "#000" : "#aaa",
            fontWeight: role === "teacher" ? "bold" : "normal",
          }}
        >
          Giáo viên
        </Typography>
      </Box>
    </Box>
  );
};

export default RoleSelection;
