import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ posts, deletePost, authenticated, user }) => (
  <ul>
    {posts.map((post) => {
      return (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link> {authenticated && post.uid === user.uid ? (<a href="#delete" onClick={(e) => deletePost(post.id)}>Delete</a>) : null}
        </li>
      );
    })}
  </ul>
);

export default List;