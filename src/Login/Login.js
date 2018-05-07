import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { app, facebookProvider, googleProvider } from '../base';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        redirect: false
    };

    this.loginForm = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
  }

  render() {
    if (this.state.redirect === true) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };

      return <Redirect to={from} />;
    }

    return (
      <div>
        <button onClick={this.handleFacebookLogin.bind(this)}>Log in with Facebook</button>
        <button onClick={this.handleGoogleLogin.bind(this)}>Log in with Google</button>

        <form onSubmit={this.handleSubmit.bind(this)} ref={this.loginForm}>
          <div>
            <label>E-mail</label><br />
            <input type="text" name="email" ref={this.email} />
          </div>
          <div>
            <label>E-mail</label><br />
            <input type="password" name="password" ref={this.password} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.email.current.value;
    const password = this.password.current.value;

    app.auth().fetchProvidersForEmail(email).then((providers) => {
      if (providers.length === 0) {
        // create user
        return app.auth().createUserWithEmailAndPassword(email, password);
      }
      else if (providers.indexOf('password') === -1) {
        // they used facebook
        alert('Try an alternativ login method');
        this.loginForm.current.reset();
      }
      else {
        // sign user in
        return app.auth().signInWithEmailAndPassword(email, password);
      }
    }).then((user) => {
      if (user) {
        this.loginForm.current.reset();

        this.props.setCurrentUser(user);

        this.setState({
          redirect: true
        });
      }
    }).catch((error) => {
      alert(error.message);
    });
  }

  handleFacebookLogin() {
    this.triggerPopup(facebookProvider);
  }

  handleGoogleLogin() {
    this.triggerPopup(googleProvider);
  }

  triggerPopup(provider) {
    app.auth().signInWithPopup(provider).then((user, error) => {
      if (error) {
        alert(error.message);
      }
      else {
        this.props.setCurrentUser(user);

        this.setState({
          redirect: true
        });
      }
    }).catch((error) => {
      alert(error.message);
    });
  }
}

export default Login;