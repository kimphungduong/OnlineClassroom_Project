import React from 'react';
import { List, Card, Button, Pagination } from 'antd';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { getForumPosts } from '../../services/courseService';
import './DiscussionForum.css';


const CommentItem = ({ author, title, description, likes, replies, onClick }) => {
  return (
    <Card 
      className="comment-item" 
      bordered={false} 
      hoverable 
      onClick={onClick} // Xử lý khi click
    >
      <h3 className="comment-title">{title}</h3>
      <p className="comment-description">{description}</p>
      <div className="comment-meta">
        <span className="comment-like"><LikeOutlined /> {likes}</span>
        <span className="comment-reply"><CommentOutlined /> {replies}</span>
      </div>
    </Card>
  );
};

const DiscussionForum = () => {
  const { slugCourse } = useParams();
  const navigate = useNavigate();

  const [forumPosts, setForumPosts] = React.useState([]);

  // Fetch comments from API
  React.useEffect(() => {
    async function fetchPost(slugCourse){
      console.log(slugCourse)
      const post = await getForumPosts(slugCourse);
      
      setForumPosts(post);
    }
    
    fetchPost(slugCourse)
    
  }, [slugCourse]);


  return (
    <div className="discussion-forum">
      <h1 className="forum-title">Diễn đàn thảo luận</h1>
      <h2 className="forum-subtitle">Bổ trợ kiến thức toán 12 - Ôn thi THPT Quốc Gia</h2>
      <div className="create-post-wrapper">
        <Button type="primary" 
        className="create-post-button"
        onClick={() => navigate(`/course/${slugCourse}/forum/add-post`)}
        >Thêm bài đăng</Button>
      </div>
      <List
        itemLayout="vertical"
        dataSource={forumPosts}
        renderItem={(forumPost) => (
          <CommentItem
            key={forumPost._id}
            author="quang cao"
            title={forumPost.title}
            description={forumPost.content}
            likes={forumPost.likes || "0"}
            replies={forumPost.replies || "0"}
            onClick={() => navigate(`/course/${slugCourse}/forum/${forumPost._id}`)} // Điều hướng khi click
          />
        )}
      />
      <Pagination defaultCurrent={1} total={50} className="pagination" />
    </div>
  );
};

export default DiscussionForum;