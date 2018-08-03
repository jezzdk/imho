import React from 'react'
import { Link } from 'react-router-dom'

import ListPosts from './Posts/ListPosts'

const Home = () => (
    <div className="container mx-auto my-4">
        <ListPosts />
    </div>
)

export default Home