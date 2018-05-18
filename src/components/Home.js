import React from 'react';
import { Link } from 'react-router-dom';

import PostList from '../containers/PostList';

const Home = () => (
  <div>
    <p className="App-intro">
      Welcome home. <Link to="/posts/create">Create a post</Link>.
    </p>
    <PostList />
  </div>
)

export default Home;