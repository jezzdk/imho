import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { firebaseApp } from '../../firebase'

class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        firebaseApp.auth().signOut().then(() => {
            this.setState({
                redirect: true
            })
        })
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/" />
        }

        return (
            <div>Logging out...</div>
        )
    }
}

export default Logout