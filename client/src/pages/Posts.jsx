import React, { useState } from 'react'
import Thumbnail1 from '../images/blog/blog1.jpg'
import Thumbnail2 from '../images/blog/blog2.jpg'
import Thumbnail3 from '../images/blog/blog3.jpg'
import Thumbnail4 from '../images/blog/blog4.jpg'
import Thumbnail5 from '../images/blog/blog5.jpg'
import PostItem from './PostItem'

import PropTypes from 'prop-types';

// import Authors from '../Components/Authors'

export const DUMMY_POSTS = [
  {
    id: '1',
    thumbnail: Thumbnail1,
    category: 'Educational',
    title: 'Education is key to success',
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus asperiores odit quia quibusdam neque tempora sunt harum iusto earum cumque dolores tenetur reiciendis ipsa eos cupiditate tempore, qui vitae alias!",
    author:'By: devara',
    authorID: 1,
  },
  {
    id: '2',
    thumbnail: Thumbnail2,
    category: 'Politics',
    title: 'Politics is road to Death',
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus asperiores odit quia quibusdam neque tempora sunt harum iusto earum cumque dolores tenetur reiciendis ipsa eos cupiditate tempore, qui vitae alias!",
    author: "By: lala",
    authorID: 2,
  },
  {
    id: '3',
    thumbnail: Thumbnail3,
    category: 'Business',
    title: 'Paisa',
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus asperiores odit quia quibusdam neque tempora sunt harum iusto earum cumque dolores tenetur reiciendis ipsa eos cupiditate tempore, qui vitae alias!",
    author:'By:salar',
    authorID: 3,
  },
];

function Posts({ posts = DUMMY_POSTS }) {
  // const [posts] = useState(DUMMY_POSTS);

  return (
    <section className="posts-section">
      <div className="posts-container">
        {posts.map(({ id, thumbnail, category, desc, title, authorID,author }) => (
          <div key={id} className="post-item">
            <img src={thumbnail} alt={title} className="post-thumbnail" />
            <div className="post-content">
              <span className="post-category">{category}</span>
              <h3 className="post-title">{title}</h3>
              <p className="post-desc">{desc}</p>
              <h4 className='post-desc'>{author}</h4>
              <p className="post-author">Author ID: {authorID}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      authorID: PropTypes.number.isRequired,
    })
  ),
};
export default Posts;
