import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditPost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorised');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: -1 }, { indent: +1 }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const POST_CATEGORIES = [
    'Agriculture',
    'Educational',
    'Medical',
    'Political',
    'Business',
    'Entertainment',
  ];

  return (
    <section className="create-post-section">
      <div className="create-post-container">
        <h2 className="create-post-title">Edit Post</h2>
        <p className='create-post-title'>Something went wrong</p>
        <form className="create-post-form">
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
          <ReactQuill
            modules={modules}
            formats={formats}
            value={desc}
            onChange={setDesc}
            className="create-post-editor"
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg"
            className="create-post-file-input"
          />
          <button type="submit" className="create-post-submit">
            Update
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;
