import React, { Component } from 'react'
import { connect } from 'react-redux'

import List from '../components/Posts/List'
import { fetchPosts, deletePost } from '../actions/posts'

class PostList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    let { isFetching, posts, error } = this.props;

    let deleteP = (id, e) => {
      e.preventDefault();
      this.props.dispatch(deletePost(id))
    }

    if (isFetching) {
      return <p>Fetching...</p>
    }

    if (!isFetching && posts.length === 0) {
      return <p>No posts yet :)</p>;
    }

    if (!isFetching && error) {
      return <p>{error}</p>
    }

    return <List posts={this.props.posts} deletePost={deleteP} />
  }
}

const mapStateToProps = state => ({
  isFetching: state.posts.fetching,
  posts: state.posts.items
})

export default connect(mapStateToProps)(PostList)