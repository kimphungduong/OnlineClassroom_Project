import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import './AddPost.css';

const mdParser = new MarkdownIt();

const AddPost = () => {
    
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
  }

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Content:', content);
    // Handle form submission logic here
  };

  const handleImageUpload = (file) => {
    // Upload image logic here
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="add-post-container">
      <h1 className="add-post-title">Thêm mới bài đăng</h1>
      <div className="add-post-section">
        <label className="add-post-label" htmlFor="title">Tiêu đề</label>
        <Input
          id="title"
          placeholder="Nhập vào tiêu đề bài đăng"
          value={title}
          onChange={handleTitleChange}
          className="add-post-input"
        />
      </div>

      <div className="add-post-section">
        <label className="add-post-label">Vấn đề của bạn là gì?</label>
        <MdEditor style={{ height: '500px',  width : '100%'}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
      
      </div>

      <div className="add-post-actions">
        <Button type="primary" onClick={handleSubmit} className="add-post-submit">
          Đăng tải
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
