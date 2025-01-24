import React, { useState,useEffect } from 'react';
import { DUMMY_POSTS } from '../pages/Posts';
import { Link } from 'react-router-dom';
 // Ensure you create and import this CSS file

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts.');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  if (loading) {
    return <div className="loading-message">Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }


  return (
    <section className="dashboard-section">
      {posts.length ? (
        <div className="dashboard-container">
          {posts.map((post) => (
            <article key={post.id} className="dashboard-post">
              <div className="post-details">
                <img src={post.thumnail} alt={post.title} className="post-thumbnail" />
                <h5 className="post-title">{post.title}</h5>
              </div>
              <div className="post-actions">
                <Link to={`/posts/${post.id}`} className="action-button view-button">
                  View
                </Link>
                <Link to={`/posts/${post.id}/edit`} className="action-button edit-button">
                  Edit
                </Link>
                <Link to={`/posts/${post.id}/delete`} className="action-button delete-button">
                  Delete
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="no-posts-message">You haven't posted yet</h2>
      )}
    </section>
  );
}

export default Dashboard;
