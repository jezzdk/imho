import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { database } from '../../firebase';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        text: ''
      }
    };
  }

  componentWillMount() {
    this.postRef = database.bindToState('posts/' + this.props.match.params.id, {
      context: this,
      state: 'post'
    });
  }

  componentWillUnmount() {
    database.removeBinding(this.postRef);
  }

  render() {
    let postId = this.props.match.params.id;

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" name="title" value={this.state.post.title} onChange={this.handleChange.bind(this)} />
          </div>
          <div>
            <label>Text</label><br />
            <textarea name="text" value={this.state.post.text} onChange={this.handleChange.bind(this)}></textarea>
          </div>
          <button type="submit">Save</button>
        </form>

        <Link to={`/posts/${postId}`}>Back</Link>
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      post: {
        ...this.state.post,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit(event) {
    let postId = this.props.match.params.id;

    database.update('posts/' + postId, {
      data: this.state.post
    });

    this.props.history.push(`/posts/${postId}`);
  }
}

export default Edit;