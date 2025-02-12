import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorised');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [author, setAuthor] = useState('1');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState('')
  const navigate = useNavigate();

  const POST_CATEGORIES = [
    'Agriculture',
    'Educational',
    'Medical',
    'Political',
    'Business',
    'Entertainment',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log("Submitting Post:", { title, category, desc, author, thumbnail });

    if (!title || !desc) {
      setError('Title and description are required.');
      return;
    }

    const formData = new FormData();
    // Unique ID
    formData.append('title', title);
    formData.append('category', category);
    formData.append('desc', desc);
    formData.append('author', user);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const response = await Axios.post('http://localhost:3000/api/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      if (response.status === 201) {
        setSuccess('Post created successfully!');
        setTitle('');
        setCategory('Uncategorised');
        setDesc('');
        setThumbnail('');
        navigate("/", { state: { newPost: response.data.post } });

      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      
    }
  };

  return (
    <section className="create-post-section">
      <div className="create-post-container">
        <h2 className="create-post-title">Create Post</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form className="create-post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="create-post-input"
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="create-post-select"
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <textarea
            placeholder='Description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="create-post-editor"
            rows={10}
          />
          <input
            type="file"
            name="thumbnail"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/png, image/jpg, image/jpeg"
            className="create-post-file-input"
          />
          <button type="submit" className="create-post-submit">
            Create Post
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
