import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginWithEmailAndPassword, loginWithFacebook, loginWithGoogle } from '../actions/auth'

class Login extends Component {
  constructor(props) {
    super(props)

    this.email = React.createRef()
    this.password = React.createRef()
  }

  render() {
    if (this.props.authenticated) {
      const { from } = this.props.location.state || { from: { pathname: '/' } }

      return <Redirect to={from} />
    }

    return (
      <div>
        <button onClick={() => this.props.loginWithFacebook()}>Log in with Facebook</button>
        <button onClick={() => this.props.loginWithGoogle()}>Log in with Google</button>

        {this.props.error ? <p>{this.props.error}</p> : null}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>E-mail</label><br />
            <input type="text" name="email" ref={this.email} />
          </div>
          <div>
            <label>E-mail</label><br />
            <input type="password" name="password" ref={this.password} />
          </div>
          <div>
            <button type="submit" disabled={this.props.authenticating}>Login</button>
          </div>
        </form>

        <Link to="/signup">Create user</Link>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.email.current.value
    const password = this.password.current.value

    this.props.loginWithEmailAndPassword(email, password)
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.loggedIn,
    authenticating: state.auth.authenticating,
    error: state.auth.loginError,
  }
}

export default connect(mapStateToProps, {
  loginWithEmailAndPassword,
  loginWithFacebook,
  loginWithGoogle
})(Login)