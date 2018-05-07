import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { base } from '../base';
import firebase from 'firebase';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: ''
    };
  }

  render() {
    return (
      <div>
        <h1>Create</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
          </div>
          <div>
            <label>Text</label><br />
            <textarea name="text" value={this.state.text} onChange={this.handleChange.bind(this)}></textarea>
          </div>
          <button type="submit">Save</button>
        </form>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    let ref = base.push('posts', {
      data: {...this.state, uid: this.props.user.uid, timestamp: firebase.database.ServerValue.TIMESTAMP}
    });

    this.props.history.push(`/posts/${ref.key}`);
  }
};

export default Create;