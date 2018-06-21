import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SingleComment from '../Comments/SingleComment'
import CreateComment from '../Comments/CreateComment'

import { fetchComments, deleteComment } from '../../actions/comments'

class Comments extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.post.id)
    }

    render() {
        let { authenticated, user, isFetching, comments, post } = this.props

        return (
            <div>
                <h3>Comments:</h3>
                {authenticated ? <CreateComment post={post} /> : null}
                {isFetching ? <p>Loading comments...</p> : null}
                {!isFetching && comments.length > 0 ? (
                    <ul>
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <SingleComment comment={comment} authenticated={authenticated} user={user} deleteComment={() => this.props.deleteComment(post.id, comment.id)}></SingleComment>
                                </li>
                            )
                        })}
                    </ul>
                ) : null}
            </div>
        )
    }
}

Comments.propTypes = {
    post: PropTypes.object,
    authenticated: PropTypes.bool,
    user: PropTypes.object,
    isFetching: PropTypes.bool,
    comments: PropTypes.array,
    fetchComments: PropTypes.func,
    deleteComment: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.loggedIn,
        user: state.auth.user,
        isFetching: state.comments.fetching,
        comments: state.comments.items
    }
}

export default connect(mapStateToProps, { fetchComments, deleteComment })(Comments)