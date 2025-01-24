import React from 'react';
import { Link } from 'react-router-dom';


function PostItem({ postId, category, title, desc, authorID, thumnail }) {
  return (
    <article className="post-item">
      {/* Thumbnail Section with Author Overlay */}
      <div className="post-thumbnail">
        <img src={thumnail} alt={title} />
        <div className="author-overlay">
          <div className="author-avatar">
            <img src={`path_to_author_image_${authorID}`} alt="Author" />
          </div>
          <div className="author-info">
            <h5 className="author-name">Author Name</h5>
            <small className="author-role">Author Role</small>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="post-content">
        <Link to={`/posts/categories/${category}`} className="post-category">
          <span>{category}</span>
        </Link>
        <Link to={`/posts/${postId}`} className="post-title-link">
          <h3 className="post-title">{title}</h3>
        </Link>
        <p className="post-desc">{desc}</p>
      </div>
    </article>
  );
}

export default PostItem;
