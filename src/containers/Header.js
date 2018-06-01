import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../actions/auth'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <Link to="/"><h1 className="App-title">Welcome to React</h1></Link>
        {this.props.authenticated ? (
          <span>Hello {this.props.user.displayName}! {this.props.user.photoURL ? <img src={this.props.user.photoURL} style={{borderRadius: '50%'}} alt={this.props.user.displayName} /> : null} <a href="#logout" onClick={(e) => this.logout(e)}>Logout</a></span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>
    )
  }

  logout(e) {
    e.preventDefault()

    this.props.logout()
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.loggedIn,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { logout })(Header)