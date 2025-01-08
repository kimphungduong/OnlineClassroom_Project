import React, { useEffect, useState } from "react";
import { Drawer, List, Typography, Divider, Spin } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import noteApi from "~/api/noteApi";

const { Title, Text } = Typography;

const NotesSidebar = ({ visible, onClose, courseId, videoRef }) => {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotesData = async () => {
      if (visible) {
        setLoading(true); // Hiển thị trạng thái loading
        try {
          const response = await noteApi.getNotesGroupedByCourse(courseId);
          setNotesData(response.data || []); // Cập nhật ghi chú vào state
        } catch (error) {
          console.error("Error fetching notes:", error);
        } finally {
          setLoading(false); // Tắt trạng thái loading
        }
      }
    };

    fetchNotesData();
  }, [visible, courseId]); // Gọi API khi `visible` hoặc `courseId` thay đổi

  const handleNoteClick = (time) => {
    if (videoRef && videoRef.current) {
      videoRef.current.seekTo(time || 0); // Nhảy đến thời gian trên video
    }
  };

  return (
    <Drawer
      title="Ghi chú của tôi"
      placement="right"
      width={400}
      onClose={onClose}
      visible={visible}
    >
      {loading ? (
        <Spin tip="Đang tải ghi chú..." />
      ) : (
<List
  itemLayout="vertical"
  dataSource={notesData}
  renderItem={(section) => (
    <div key={section.sectionId}>
      <Title level={4}>{section.sectionTitle}</Title>
      <Divider />
      {section.lessons.map((lesson) => (
        <div key={lesson.lessonId}>
          <Title level={5} style={{ color: "orange" }}>
            {lesson.lessonTitle}
          </Title>
          {lesson.notes.map((note, index) => (
            <div
              key={index}
              style={{ marginBottom: "16px", cursor: "pointer" }}
              onClick={() => handleNoteClick(note.time)}
            >
              <Text strong>
                {note.time
                  ? `${new Date(note.time * 1000)
                      .toISOString()
                      .substr(14, 5)}`
                  : "00:00"}
              </Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <PlayCircleOutlined
                  style={{ marginRight: "8px", color: "blue" }}
                />
                {/* Render content safely */}
                <span
                  dangerouslySetInnerHTML={{ __html: note.content }}
                  style={{ marginLeft: "8px" }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )}
/>

      )}
    </Drawer>
  );
};

export default NotesSidebar;
