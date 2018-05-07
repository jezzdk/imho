import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { base } from '../base';
import firebase from 'firebase';

import ViewComment from '../Comments/View';
import CreateComment from '../Comments/Create';

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        text: ''
      },
      comments: {}
    };
  }

  componentWillMount() {
    this.postRef = base.bindToState('posts/' + this.props.match.params.id, {
      context: this,
      state: 'post'
    });

    this.commentsRef = base.bindToState('posts/' + this.props.match.params.id + '/comments', {
      context: this,
      state: 'comments'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.postRef);
    base.removeBinding(this.commentsRef);
  }

  render() {
    let postId = this.props.match.params.id;

    return (
      <div>
        <h2>{this.state.post.title}</h2>
        <p>{this.state.post.text}</p>
        <Link to="/">Back</Link> <Link to={`/posts/${postId}/edit`}>Edit</Link>
        <h3>Comments:</h3>
        {this.props.authenticated ? <CreateComment save={this.saveComment.bind(this)} /> : null}
        {this.renderComments()}
      </div>
    );
  }

  renderComments() {
    if (this.state.comments.length === 0) {
      return null;
    }

    let commentIds = Object.keys(this.state.comments);

    return (
      <ul>
        {commentIds.map((id) => {
          return (
            <li key={id}>
              <ViewComment comment={this.state.comments[id]} delete={this.deleteComment.bind(this, id)}></ViewComment>
            </li>
          );
        })}
      </ul>
    );
  }

  saveComment(comment, event) {
    base.push('posts/' + this.props.match.params.id + '/comments', {
      data: {...comment, uid: this.props.user.uid, timestamp: firebase.database.ServerValue.TIMESTAMP}
    });
  }

  deleteComment(commentId, event) {
    event.preventDefault();

    base.remove('posts/' + this.props.match.params.id + '/comments/' + commentId);
  }
};

export default View;