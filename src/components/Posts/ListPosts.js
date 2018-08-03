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
            return <div className="text-center">Loading posts...</div>
        }

        if (!isFetching && posts.length === 0) {
            return (<div className="text-center">No posts yet :)</div>)
        }

        if (!isFetching && error) {
            return <p>{error}</p>
        }

        return (
            <div className="flex">
                {posts.map((post) => {
                    return (
                        <div key={post.id} className="w-1/2">
                            <Link to={`/posts/${post.id}`} className="block m-4 bg-white shadow rounded-lg">
                                <div className="h-64 bg-cover bg-center rounded-t-lg relative" style={{backgroundImage: 'url('+(post.image || '/images/placeholder.jpg')+')'}}>
                                    <div className="bg-black p-2 absolute pin-b pin-l text-white font-semibold">{post.title}</div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        {post.author && post.author.photoURL ? <img alt="avatar" src={post.author.photoURL} className="w-8 h-8 mr-2 rounded-full" /> : null}
                                        <div className="">
                                            <div className="text-sm">{post.author.displayName}</div>
                                            <div className="text-sm text-grey">{post.createdAt ? moment.unix(post.createdAt.seconds).format('j F Y HH:mm') : null}</div>
                                        </div>
                                    </div>

                                    {authenticated && post.uid === user.uid ? (<a href="#delete" onClick={(e) => deletePost(post.id)}>Delete</a>) : null}
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
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