import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Posts, { DUMMY_POSTS } from '../pages/Posts'
import Axios from 'axios';


function HomePage() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prevPosts) => [...prevPosts, location.state.newPost]);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/api/posts');
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
      
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);


  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
}

export default HomePage
