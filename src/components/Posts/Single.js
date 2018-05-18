import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../firebase';
import firebase from 'firebase';

import SingleComment from '../Comments/Single';
import CreateComment from '../Comments/Create';

const Single = ({ post, comments, authenticated, saveComment, deleteComment }) => {
  if (post === undefined) {
    return null;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <Link to="/">Back</Link> <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      <h3>Comments:</h3>
      {authenticated ? <CreateComment post={post} save={saveComment} /> : null}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <SingleComment comment={comment} delete={deleteComment(comment.id)}></SingleComment>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default Single;