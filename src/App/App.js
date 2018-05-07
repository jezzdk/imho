import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import { app } from '../base';
import Header from './Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import CreatePost from '../Posts/Create';
import ViewPost from '../Posts/View';
import EditPost from '../Posts/Edit';

function AuthenticatedRoute({ component: Component, authenticated, ...rest}) {
  return (
    <Route {...rest} render={(props) => {
      return authenticated === true ? <Component {...props} {...rest} /> : <Redirect to={ { pathname: '/login', state: { from: props.location } } } />;
    }} />
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: null,
      loading: true
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          user: user,
          loading: false
        });
      }
      else {
        this.setState({
          authenticated: false,
          user: null,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  setCurrentUser(user) {
    this.setState({
      authenticated: true,
      user: user,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Header authenticated={this.state.authenticated} user={this.state.user} />
          <Switch>
            <Route path="/" exact render={(props) => <Home user={this.state.user} {...props} />} />
            <Route path="/login" exact render={(props) => <Login setCurrentUser={this.setCurrentUser.bind(this)} {...props} />} />
            <Route path="/logout" exact component={Logout} />
            <AuthenticatedRoute path="/posts/create" exact component={CreatePost} authenticated={this.state.authenticated} user={this.state.user} />
            <Route path="/posts/:id" exact render={(props) => <ViewPost {...props} authenticated={this.state.authenticated} user={this.state.user} />} />
            <Route path="/posts/:id/edit" exact component={EditPost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
