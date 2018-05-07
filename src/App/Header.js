import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <header className="App-header">
    <Link to="/"><h1 className="App-title">Welcome to React</h1></Link>
    {props.authenticated ? (
      <span>Hello {props.user.displayName}! {props.user.photoURL ? <img src={props.user.photoURL} style={{borderRadius: '50%'}} /> : null} <Link to="/logout">Logout</Link></span>
     ) : (
      <Link to="/login">Login</Link>
     )}
  </header>
);

export default Header