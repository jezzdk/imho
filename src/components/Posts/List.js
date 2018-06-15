import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const List = ({ posts, deletePost, authenticated, user }) => (
    <ul>
        {posts.map((post) => {
            console.log(post)
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

export default List