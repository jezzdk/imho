import React from 'react'

const Single = ({ post }) => {
    if (post === undefined) {
        return null
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
        </div>
    )
}

export default Single