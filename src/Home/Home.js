import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { base } from '../base';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
          posts: {}
        };
    }

    componentWillMount() {
      this.postRef = base.syncState('posts', {
        context: this,
        state: 'posts'
      });
    }

    componentWillUnmount() {
      base.removeBinding(this.postRef);
    }

    render() {
      let postIds = Object.keys(this.state.posts);

      return (
        <div>
          <p className="App-intro">
            Welcome home. <Link to="/posts/create">Create a post</Link>.
          </p>
          <ul>
            {postIds.map((id) => {
              return (
                <li key={id}>
                  <Link to={`/posts/${id}`}>{this.state.posts[id].title}</Link> <a href="#delete" onClick={this.deletePost.bind(this, id)}>Delete</a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    deletePost(postId, event) {
      event.preventDefault();

      base.remove('posts/' + postId);
    }
}

export default Home;