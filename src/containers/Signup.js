import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signupWithEmailAndPassword, loginWithFacebook, loginWithGoogle } from '../actions/auth'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.name = React.createRef()
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
        <button onClick={() => this.props.loginWithFacebook()}>Sign up with Facebook</button>
        <button onClick={() => this.props.loginWithGoogle()}>Sign up with Google</button>

        {this.props.error ? <p>{this.props.error}</p> : null}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Full name</label><br />
            <input type="text" name="name" ref={this.name} />
          </div>
          <div>
            <label>E-mail</label><br />
            <input type="text" name="email" ref={this.email} />
          </div>
          <div>
            <label>E-mail</label><br />
            <input type="password" name="password" ref={this.password} />
          </div>
          <div>
            <button type="submit" disabled={this.props.authenticating}>Sign up</button>
          </div>
        </form>

        <p>Already have a user? <Link to="/login">Log in</Link></p>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault()

    const name = this.name.current.value
    const email = this.email.current.value
    const password = this.password.current.value

    this.props.signupWithEmailAndPassword(name, email, password)
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
  signupWithEmailAndPassword,
  loginWithFacebook,
  loginWithGoogle
})(Signup)