import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthenticatedRoute from './AuthenticatedRoute'
import CreatePost from './Posts/CreatePost'
import EditPost from './Posts/EditPost'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import PageNotFound from './PageNotFound'
import Profile from './Profile'
import Signup from './Signup'
import SinglePost from './Posts/SinglePost'

import { fetchAuthInfo } from '../actions/auth'

class App extends Component {
    componentDidMount() {
        this.props.fetchAuthInfo()
    }

    render() {
        if (this.props.loading) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/404" component={PageNotFound} />
                        <AuthenticatedRoute path="/posts/create" component={CreatePost} authenticated={this.props.authenticated} />
                        <AuthenticatedRoute path="/posts/:id/edit" component={EditPost} authenticated={this.props.authenticated} />
                        <Route path="/posts/:id" component={SinglePost} />
                        <AuthenticatedRoute path="/profile" component={Profile} authenticated={this.props.authenticated} />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

App.propTypes = {
    fetchAuthInfo: PropTypes.func,
    loading: PropTypes.bool,
    authenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    loading: state.auth.fetching,
    user: state.auth.user,
    authenticated: state.auth.loggedIn
})

export default connect(mapStateToProps, { fetchAuthInfo })(App)
