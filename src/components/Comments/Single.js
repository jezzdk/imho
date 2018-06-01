import React from 'react';

const Single = ({ comment, authenticated, user, deleteComment }) => (
  <div>
    <h4>{comment.title}</h4>
    <p>{comment.text}</p>
    {authenticated && comment.uid === user.uid ? (<p><a href="#delete" onClick={deleteComment}>Delete</a></p>) : null}
  </div>
);

export default Single;