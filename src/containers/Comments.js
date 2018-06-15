import React, { Component } from 'react'
import { connect } from 'react-redux'

import Single from '../components/Comments/Single'
import CreateComment from '../components/Comments/Create'

import { fetchComments, saveComment, deleteComment } from '../actions/comments'

class Comments extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.post.id)
    }

    render() {
        let { authenticated, user, isFetching, comments, post } = this.props

        return (
            <div>
                <h3>Comments:</h3>
                {authenticated ? <CreateComment post={post} save={this.props.saveComment} /> : null}
                {isFetching ? <p>Loading comments...</p> : null}
                {!isFetching && comments.length > 0 ? (
                    <ul>
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <Single comment={comment} authenticated={authenticated} user={user} deleteComment={() => this.props.deleteComment(post.id, comment.id)}></Single>
                                </li>
                            )
                        })}
                    </ul>
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.loggedIn,
        user: state.auth.user,
        isFetching: state.comments.fetching,
        comments: state.comments.items
    }
}

export default connect(mapStateToProps, { fetchComments, saveComment, deleteComment })(Comments)