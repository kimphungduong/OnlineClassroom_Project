import React from 'react';
import { List, Card, Button, Pagination } from 'antd';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import './DiscussionForum.css';

const comments = [
  {
    id: 1,
    author: "Quang Cao",
    title: "Làm sao để có thể giải được bài toán tìm giá trị nhỏ nhất?",
    description:
      "Bài toán được trích dẫn trong đề thi THPT 2022, câu số 58 dạng Vận Dụng, mình đã thử nhiều các ví tham khảo tài liệu nhiều nguồn...",
    likes: 123,
    replies: 111,
  },
  {
    id: 2,
    author: "Quang Cao",
    title: "Làm sao để có thể giải được bài toán tìm giá trị nhỏ nhất?",
    description:
      "Bài toán được trích dẫn trong đề thi THPT 2022, câu số 58 dạng Vận Dụng, mình đã thử nhiều các ví tham khảo tài liệu nhiều nguồn...",
    likes: 123,
    replies: 111,
  },
  // Add more comments here
];

const CommentItem = ({ author, title, description, likes, replies }) => {
  return (
    <Card className="comment-item" bordered={false} hoverable>
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
  return (
    <div className="discussion-forum">
      <h1 className="forum-title">Diễn đàn thảo luận</h1>
      <h2 className="forum-subtitle">Bổ trợ kiến thức toán 12 - Ôn thi THPT Quốc Gia</h2>
      <div className="create-post-wrapper">
        <Button type="primary" className="create-post-button">Thêm bài đăng</Button>
      </div>
      <List
        itemLayout="vertical"
        dataSource={comments}
        renderItem={(comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author}
            title={comment.title}
            description={comment.description}
            likes={comment.likes}
            replies={comment.replies}
          />
        )}
      />
      <Pagination defaultCurrent={1} total={50} className="pagination" />
    </div>
  );
};

export default DiscussionForum;