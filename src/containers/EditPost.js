import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Edit from '../components/Posts/Edit'

import { fetchPost, updatePost } from '../actions/posts'

class EditPost extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    render() {
        let { isFetching, post } = this.props

        if (isFetching) {
            return <p>Loading...</p>
        }

        if (!isFetching && post === null) {
            return null
        }

        let postId = post.id

        return (
            <div>
                <Edit post={post} updatePost={this.updatePost.bind(this)} />
                <Link to={`/posts/${postId}`}>Go back</Link>
            </div>
        )
    }

    updatePost(data) {
        let postId = this.props.post.id

        this.props.updatePost(postId, data)

        this.props.history.push(`/posts/${postId}`)
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.posts.fetching,
        post: state.posts.lastPost,
    }
}

export default connect(mapStateToProps, { fetchPost, updatePost })(EditPost)