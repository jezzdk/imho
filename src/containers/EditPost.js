import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Edit from '../components/Posts/Edit'

import { fetchPost, updatePost, uploadImage } from '../actions/posts'

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

    updatePost(data, file) {
        let postId = this.props.post.id

        if (file) {
            this.props.uploadImage(file).then((fileData) => {
                this.props.updatePost(postId, {
                    ...data,
                    image: fileData
                }).then(() => {
                    this.props.history.push(`/posts/${postId}`)
                })
            })
        }
        else {
            this.props.updatePost(postId, data).then(() => {
                this.props.history.push(`/posts/${postId}`)
            })
        }
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.posts.fetching,
        post: state.posts.lastPost,
    }
}

export default connect(mapStateToProps, { fetchPost, updatePost, uploadImage })(EditPost)