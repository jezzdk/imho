import React from 'react'
import moment from 'moment'

const Single = ({ comment, authenticated, user, deleteComment }) => (
    <div>
        <h4>{comment.title}</h4>
        <p>{comment.text}</p>
        <p>{comment.author ? <span><img alt="" src={comment.author.avatar || '/images/avatar.png'} style={{maxWidth: '50px'}} />{comment.author.name}</span> : null}</p>
        <p>{comment.createdAt ? moment.unix(comment.createdAt.seconds).format('YYYY-MM-DD HH:mm') : null}</p>
        {authenticated && comment.uid === user.uid ? (<p><a href="#delete" onClick={deleteComment}>Delete</a></p>) : null}
    </div>
)

export default Single