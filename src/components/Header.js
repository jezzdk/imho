import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logout } from '../actions/auth'

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <Link to="/"><h1 className="App-title">Welcome to React</h1></Link>
                {this.props.authenticated ? (
                    this.props.loading || !this.props.user ? (
                        <span>Loading...</span>
                    ) : (
                        <span>Hello <Link to="/profile">{this.props.user.displayName}</Link>! {this.props.user.photoURL ? <img src={this.props.user.photoURL} style={{borderRadius: '50%', maxWidth: '50px'}} alt={this.props.user.displayName} /> : null} <a href="#logout" onClick={(e) => this.logout(e)}>Logout</a></span>
                    )
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

Header.propTypes = {
    authenticated: PropTypes.bool,
    user: PropTypes.object,
    loading: PropTypes.bool,
    logout: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.loggedIn,
        user: state.profile.data,
        loading: state.profile.fetching
    }
}

export default connect(mapStateToProps, { logout })(Header)