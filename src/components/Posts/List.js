import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const List = ({ posts, deletePost, authenticated, user }) => (
    <ul>
        {posts.map((post) => {
            return (
                <li key={post.id}>
                    {moment.unix(post.createdAt.seconds).format('YYYY-MM-DD HH:mm')} {post.author && post.author.photoURL ? <img src={post.author.photoURL} style={{maxWidth: '50px'}} /> : null} <Link to={`/posts/${post.id}`}>{post.title}</Link> {authenticated && post.uid === user.uid ? (<a href="#delete" onClick={(e) => deletePost(post.id)}>Delete</a>) : null}
                </li>
            )
        })}
    </ul>
)

export default List