import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { app } from '../base';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        };
    }

    componentWillMount() {
      app.auth().signOut().then(() => {
        this.setState({
          redirect: true
        });
      });
    }

    render() {
        if (this.state.redirect === true) {
          return <Redirect to="/" />;
        }

        return (
            <div>Logging out...</div>
        );
    }
}

export default Logout;