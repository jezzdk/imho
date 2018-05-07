import React from 'react';

const View = props => (
    <div>
      <h4>{props.comment.title}</h4>
      <p>{props.comment.text}</p>
      <p><a href="#delete" onClick={props.delete}>Delete</a></p>
    </div>
);

export default View;