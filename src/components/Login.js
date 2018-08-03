import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
            <div className="container mx-auto my-4">
                <div className="w-1/2 mx-auto">

                    {this.props.error ? (
                        <div class="bg-red-lightest border border-red-light text-red-dark mt-8 px-4 py-3 rounded relative" role="alert">
                            <div><strong class="font-bold">An error occurred</strong></div>
                            <div><span>{this.props.error}</span></div>
                        </div>
                    ) : null}

                    <div className="mt-8 p-8 bg-white shadow-md rounded">
                        <div className="mb-4">
                            <button onClick={() => this.props.loginWithFacebook()} className="w-full rounded p-2 bg-blue text-white">Log in with Facebook</button>
                        </div>
                        <div className="mb-8">
                            <button onClick={() => this.props.loginWithGoogle()} className="w-full rounded p-2 bg-white text-red border border-red">Log in with Google</button>
                        </div>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-semibold mb-2" htmlFor="username">E-mail</label>
                                <input type="text" name="email" ref={this.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-semibold mb-2" htmlFor="username">E-mail</label>
                                <input type="password" name="password" ref={this.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue hover:bg-blue-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={this.props.authenticating}>
                                    Sign In
                                </button>
                                <Link to="/signup" class="inline-block align-baseline font-semibold text-sm text-blue hover:text-blue-darker">Create user</Link>
                            </div>
                        </form>
                    </div>
                </div>
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

Login.propTypes = {
    authenticated: PropTypes.bool,
    authenticating: PropTypes.bool,
    error: PropTypes.string,
    loginWithEmailAndPassword: PropTypes.func,
    loginWithFacebook: PropTypes.func,
    loginWithGoogle: PropTypes.func,
    location: PropTypes.object
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