import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Create from '../components/Posts/Create'

import { savePost } from '../actions/posts'

class CreatePost extends Component {
  render() {
    return (
      <div>
        <Create savePost={this.savePost.bind(this)} user={this.props.user} />
        <Link to="/">Go back</Link>
      </div>
    )
  }

  savePost(data) {
    this.props.savePost(data)

    this.props.history.push(`/`);
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { savePost })(CreatePost)