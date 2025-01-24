import React, { useState } from 'react';
import Axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorised');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [author, setAuthor] = useState('1');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user , setUser] = useState('')
  const navigate = useNavigate();

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ['bold', 'italic', 'underline', 'strike'],
  //     [{ list: 'ordered' }, { list: 'bullet' }, { indent: -1 }, { indent: +1 }],
  //     ['link', 'image'],
  //     ['clean'],
  //   ],
  // };

  // const formats = [
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'link',
  //   'image',
  // ];

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

    if (!title || !desc) {
      setError('Title and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('desc', desc);
    formData.append('author', user.id);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const response = await Axios.post('http://localhost:3000/api/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      });


      if (response.status === 201) {
        // const newPost = {
        //   id: `${Date.now()}`, // Generate a unique ID
        //   thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : '',
        //   category,
        //   title,
        //   desc,
        //   author: `By: ${author}`,
        //   authorID: Number(author),
        // };
        setSuccess('Post created successfully!');
        setTitle('');
        setCategory('Uncategorised');
        setDesc('');
        setThumbnail('');
        navigate('/');
        // navigate('/', { state: { newPost } });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      console.error('Error creating post:', err);
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
            onChange={(e)=>setDesc(e.target.value)}
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
