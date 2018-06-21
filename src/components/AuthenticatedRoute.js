import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

function AuthenticatedRoute({ component: Component, authenticated, ...rest}) {
    return (
        <Route {...rest} render={(props) => {
            return authenticated === true ? <Component {...props} {...rest} /> : <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
        }} />
    )
}

AuthenticatedRoute.propTypes = {
    component: PropTypes.func,
    authenticated: PropTypes.bool,
    location: PropTypes.object
}

export default AuthenticatedRoute