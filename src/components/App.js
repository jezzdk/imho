import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from '../components/Home'
import PageNotFound from '../components/PageNotFound'

import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import SinglePost from './Posts/SinglePost'
import CreatePost from './Posts/CreatePost'
import EditPost from './Posts/EditPost'

import { fetchAuthInfo } from '../actions/auth'

function AuthenticatedRoute({ component: Component, authenticated, ...rest}) {
    return (
        <Route {...rest} render={(props) => {
            return authenticated === true ? <Component {...props} {...rest} /> : <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
        }} />
    )
}

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
                        <Redirect to="/404" />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.auth.fetching,
    user: state.auth.user,
    authenticated: state.auth.loggedIn
})

export default connect(mapStateToProps, { fetchAuthInfo })(App)
