import React, { Component } from 'react'
import { connect } from 'react-redux'

import List from '../components/Posts/List'
import { fetchPosts, deletePost } from '../actions/posts'

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

        return <List posts={posts} authenticated={authenticated} user={user} deletePost={deletePost} />
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.loggedIn,
    user: state.auth.user,
    isFetching: state.posts.fetching,
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostList)