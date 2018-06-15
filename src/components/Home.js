import React from 'react'
import { Link } from 'react-router-dom'

import ListPosts from './Posts/ListPosts'

const Home = () => (
    <div>
        <p className="App-intro">Welcome home. <Link to="/posts/create">Create a post</Link>.</p>
        <ListPosts />
    </div>
)

export default Home