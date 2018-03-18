import React, { Component } from 'react';
import './App.css';
import * as api from './api'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { AuthProvider, AuthRoute } from 'react-router-auth-provider'
import LoginForm from './LoginForm'
import Hello from './Hello'
import { createMuiTheme, MuiThemeProvider } from 'material-ui';


function Index() {
  return (
    <div>Index</div>
  )
}

function About() {
  return (
    <div>This is a public page</div>
  )
}

function MyAuthProvider(props) {
  return <AuthProvider
    whoami={api.whoami}
    logout={api.logout}
    {...props}
  />

}

function MyAuthRoute(props){
  return <AuthRoute loginRoute='/login' {...props}/>
}

const theme = createMuiTheme();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <MyAuthProvider>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/about" component={About} />
            <Route exact path="/" component={Index} />
            <MyAuthRoute path="/hello" component={Hello} />
          </MyAuthProvider>
        </Router>
      </MuiThemeProvider>)
  }

}

export default App

