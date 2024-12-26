import React, { useState } from 'react';
import { Button, Input, notification } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import './AddPost.css';
import { addPost } from '../../services/courseService';

const mdParser = new MarkdownIt();

const AddPost = () => {
  const { slugCourse } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({ title: '', content: '' });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  function handleEditorChange({ html, text }) {
    setContent(text);
    if (text.trim()) {
      setErrors((prev) => ({ ...prev, content: '' }));
    }
  }

  const handleSubmit = async () => {
    let hasError = false;

    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: 'Tiêu đề là bắt buộc.' }));
      hasError = true;
    }

    if (!content.trim()) {
      setErrors((prev) => ({ ...prev, content: 'Nội dung là bắt buộc.' }));
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await addPost(slugCourse, { title, content });
      if (response.success) {
        notification.success({
          message: 'Thành công',
          description: 'Bài đăng đã được lưu thành công!',
        });
        navigate(`/course/${slugCourse}/forum`);
      } else {
        notification.error({
          message: 'Thất bại',
          description: response.message || 'Đã xảy ra lỗi khi lưu bài đăng.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi hệ thống',
        description: 'Không thể lưu bài đăng. Vui lòng thử lại sau.',
      });
    }
  };

  return (
    <div className="add-post-container">
      <h1 className="add-post-title">Thêm mới bài đăng</h1>

      <div className="add-post-section">
        <label className="add-post-label" htmlFor="title">
          Tiêu đề <span className="required">*</span>
        </label>
        <Input
          id="title"
          placeholder="Nhập vào tiêu đề bài đăng"
          value={title}
          onChange={handleTitleChange}
          className={`add-post-input ${errors.title ? 'error' : ''}`}
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="add-post-section">
        <label className="add-post-label">
          Vấn đề của bạn là gì? <span className="required">*</span>
        </label>
        <MdEditor
          style={{ height: '500px', width: '100%' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          className={errors.content ? 'error' : ''}
        />
        {errors.content && <p className="error-text">{errors.content}</p>}
      </div>

      <div className="add-post-actions">
        <Button
          type="primary"
          onClick={handleSubmit}
        >
          Đăng tải
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
