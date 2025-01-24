import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/blog/avatar1.jpg';

function PostAuthor() {
  return (
    <Link to={`/posts/users/asdf`} className="post-author">
      <div className="author-avatar">
        <img src={Avatar} alt="Author Avatar" />
      </div>
      <div className="author-info">
        <h5 className="author-name">Don</h5>
        <small className="author-role">Sambata</small>
      </div>
    </Link>
  );
}

export default PostAuthor;
