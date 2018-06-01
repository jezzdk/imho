import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Single from '../components/Posts/Single'
import Comments from './Comments'

import { fetchPost, deletePost } from '../actions/posts'

class SinglePost extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id)
  }

  render() {
    let { isFetching, post, authenticated, user } = this.props

    if (isFetching) {
      return <p>Loading...</p>
    }

    if (!isFetching && post === null) {
      return null
    }

    return (
      <div>
        <Single post={post} />

        <Link to="/">Back</Link> {authenticated && post.uid === user.uid ? (<span><Link to={`/posts/${post.id}/edit`}>Edit</Link> <a href="#delete" onClick={(e) => this.deletePost(e)}>Delete</a></span>) : null}

        <Comments post={post} />
      </div>
    )
  }

  deletePost(e) {
    e.preventDefault();

    this.props.deletePost(this.props.post.id);

    this.props.history.push('/');
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.auth.loggedIn,
    user: state.auth.user,
    isFetching: state.posts.fetching,
    post: state.posts.lastPost,
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(SinglePost)