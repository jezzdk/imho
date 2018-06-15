import React from 'react'

const Single = ({ post }) => {
    if (post === undefined) {
        return null
    }

    return (
        <div>
            <h2>{post.title}</h2>
            {post.image ? (
                <div>
                    <img alt="" src={post.image} style={{maxWidth: '500px'}} />
                </div>
            ) : null}
            <p>{post.text}</p>
        </div>
    )
}

export default Single