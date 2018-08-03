import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logout } from '../actions/auth'

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="bg-grey-lightest shadow">
                    <div className="container flex items-center justify-between flex-wrap p-6 mx-auto">
                        <div className="flex items-center flex-no-shrink mr-6">
                            <Link to="/" class="text-grey-darkest hover:text-grey-dark"><span className="font-black text-3xl tracking-tight">Citybaby</span></Link>
                        </div>
                        <div className="block lg:hidden">
                            <button className="flex items-center px-3 py-2 border rounded text-grey-darkest border-grey-darkest hover:text-grey-dark hover:border-grey-dark">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                            </button>
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="text-sm lg:flex-grow">
                                <Link to="/posts/create" className="block mt-4 lg:inline-block lg:mt-0 text-grey-dark hover:text-grey-darkest mr-4">Create a post</Link>
                            </div>
                            <div className="mt-2 lg:mt-0">
                                {this.props.authenticated ? (
                                    this.props.loading || !this.props.user ? (
                                        <span>Loading...</span>
                                    ) : (
                                        <span className="flex items-center">
                                            {this.props.user.photoURL ? <img src={this.props.user.photoURL} className="rounded-full h-8 w-8 mr-2" alt={this.props.user.displayName} /> : null} <Link to="/profile" class="text-grey-dark hover:text-grey-darkest text-sm">{this.props.user.displayName}</Link>
                                            <a href="#logout" onClick={(e) => this.logout(e)} className="inline-block text-sm px-4 py-2 ml-4 leading-none border rounded text-grey-darkest border-grey-darkest hover:border-transparent hover:text-white hover:bg-grey-darkest">Logout</a>
                                        </span>
                                    )
                                ) : (
                                    <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-grey-darkest border-grey-darkest hover:border-transparent hover:text-white hover:bg-grey-darkest">Login</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
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