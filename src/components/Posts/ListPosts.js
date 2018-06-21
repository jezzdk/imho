import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { fetchPosts, deletePost } from '../../actions/posts'

class PostList extends Component {
    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        let { isFetching, posts, deletePost, authenticated, user, error } = this.props

        if (isFetching) {
            return <p>Fetching...</p>
        }

        if (!isFetching && posts.length === 0) {
            return <p>No posts yet :)</p>
        }

        if (!isFetching && error) {
            return <p>{error}</p>
        }

        return (
            <ul>
                {posts.map((post) => {
                    return (
                        <li key={post.id}>
                            {post.createdAt ? moment.unix(post.createdAt.seconds).format('YYYY-MM-DD HH:mm') : null}
                            -
                            {post.author && post.author.name ? <span>Skrevet af: {post.author.name}</span> : null}
                            -
                            {post.author && post.author.photoURL ? <img alt="avatar" src={post.author.photoURL} style={{maxWidth: '50px'}} /> : null}
                            -
                            <Link to={`/posts/${post.id}`}>{post.title}</Link> {authenticated && post.uid === user.uid ? (<a href="#delete" onClick={(e) => deletePost(post.id)}>Delete</a>) : null}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

PostList.propTypes = {
    authenticated: PropTypes.bool,
    user: PropTypes.object,
    isFetching: PropTypes.bool,
    posts: PropTypes.array,
    error: PropTypes.string,
    fetchPosts: PropTypes.func,
    deletePost: PropTypes.func
}

const mapStateToProps = state => ({
    authenticated: state.auth.loggedIn,
    user: state.auth.user,
    isFetching: state.posts.fetching,
    posts: state.posts.items,
    error: state.posts.error
})

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostList)