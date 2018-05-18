import React, { Component } from 'react';
import { connect } from 'react-redux'

import Single from '../components/Posts/Single'
import { fetchPosts, deletePost, saveComment, deleteComment } from '../actions/posts'

class SinglePost extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    let { isFetching, post, comments, authenticated } = this.props;

    if (isFetching) {
      return <p>Loading...</p>
    }

    let saveC = (comment) => {
      this.props.dispatch(saveComment(comment));
    }

    let deleteComment = (id) => {
      this.props.dispatch(deleteComment(id));
    }

    return <Single post={post} comments={comments} authenticated={authenticated} saveComment={saveC} deleteComment={deleteComment}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  let post = state.posts.items.find((p) => {
    return p.id === ownProps.match.params.id;
  });
console.log(post, state.posts.items, ownProps.match.params.id);
  return {
    isFetching: state.posts.fetching,
    post,
    comments: []
  }
}

export default connect(
  mapStateToProps
)(SinglePost)