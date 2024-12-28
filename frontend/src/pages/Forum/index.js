import React, { useState, useEffect } from 'react';
import { List, Button, Pagination } from 'antd';
import { CommentItem } from '../../components/PostCardDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { getForumPosts } from '../../services/courseService';
import './DiscussionForum.css';



const DiscussionForum = () => {
  const { slugCourse } = useParams();
  const navigate = useNavigate();

  const [forumPosts, setForumPosts] = useState([]); // Toàn bộ bài viết
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5 // Số bài viết trên mỗi trang

  // Fetch toàn bộ bài viết từ API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getForumPosts(slugCourse); // Lấy toàn bộ bài viết
        setForumPosts(posts); 
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
      }
    }
    fetchPosts();
  }, [slugCourse]);

  // Xác định dữ liệu bài viết trên trang hiện tại
  const paginatedPosts = forumPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  console.log(paginatedPosts);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
  };

  return (
    <div className="discussion-forum">
      <h1 className="forum-title">Diễn đàn thảo luận</h1>
      <h2 className="forum-subtitle">Bổ trợ kiến thức toán 12 - Ôn thi THPT Quốc Gia</h2>
      <div className="create-post-wrapper">
        <Button 
          type="primary" 
          className="create-post-button"
          onClick={() => navigate(`/course/${slugCourse}/forum/add-post`)}
        >
          Thêm bài đăng
        </Button>
      </div>
      <List
        itemLayout="vertical"
        dataSource={paginatedPosts} 
        renderItem={(forumPost) => (
          <CommentItem
            key={forumPost._id}
            title={forumPost.title}
            authorName={forumPost.name}
            authorAvatar={forumPost.avatar}
            votes={forumPost.voteCount || "0"}
            replies={forumPost.commentCount || "0"}
            onClick={() => navigate(`/course/${slugCourse}/forum/${forumPost._id}`)} 
          />
        )}
      />
      <Pagination
        current={currentPage}
        total={forumPosts.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        className="pagination"
      />
    </div>
  );
};

export default DiscussionForum;
