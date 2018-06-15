import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Comments from './Comments'

import { fetchPost, deletePost } from '../../actions/posts'

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
                <div>
                    <h2>{post.title}</h2>
                    {post.createdAt ? <p>Written: {moment.unix(post.createdAt.seconds).format('YYYY-MM-DD HH:mm')}</p> : null}
                    {post.updatedAt ? <p>Edited: {moment.unix(post.updatedAt.seconds).format('YYYY-MM-DD HH:mm')}</p> : null}
                    {post.author ? (
                        <div>
                            <img alt="" src={post.author.avatar || '/images/avatar.png'} style={{maxWidth: '50px'}} />
                            {post.author.name}
                        </div>
                    ) : null}
                    {post.image ? (
                        <div>
                            <img alt="" src={post.image} style={{maxWidth: '500px'}} />
                        </div>
                    ) : null}
                    <p>{post.text}</p>
                </div>

                <Link to="/">Back</Link> {authenticated && user && post.uid === user.uid ? (<span><Link to={`/posts/${post.id}/edit`}>Edit</Link> <a href="#delete" onClick={(e) => this.deletePost(e)}>Delete</a></span>) : null}

                <Comments post={post} />
            </div>
        )
    }

    deletePost(e) {
        e.preventDefault()

        this.props.deletePost(this.props.post.id).then(() => {
            this.props.history.push('/')
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.loggedIn,
        user: state.auth.user,
        isFetching: state.posts.fetching,
        post: state.posts.currentPost,
    }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(SinglePost)