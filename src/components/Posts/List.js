import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ posts, deletePost }) => (
  <ul>
    {posts.map((post) => {
      return (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link> <a href="#delete" onClick={(e) => deletePost(post.id)}>Delete</a>
        </li>
      );
    })}
  </ul>
);

export default List;