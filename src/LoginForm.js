// @flow
import React, { Component } from 'react'
import withRouter from 'react-router-dom/withRouter';
import { withAuth } from 'react-router-auth-provider';
import TextField from 'material-ui/TextField/TextField';
import * as api from './api'
import Button from 'material-ui/Button/Button';

type cb = (string) => void

function UserNameTextBox({ username, onChange}: {username: string, onChange:cb})
{
  return <TextField
    label='Username'
    value={username}
    onChange={(e) => onChange(e.target.value)}
  />
}

function PasswordTextbox({ password, onChange}: {password: string, onChange: cb})
{
  return <TextField
    label='Password'
    type="password"
    value={password}
    onChange={(e) => onChange(e.target.value)}
  />
}

type LoginFormState = {
  username: string,
  password: string,
  warning: string,
}

type LoginFromProps = {
  onLoginSuccess: any,//from withAuth
  history: any //from react router
}

class LoginForm extends Component<LoginFromProps, LoginFormState> {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      warning: ''
    }
  }

  handleChange = (name) => (value) => this.setState({[name]: value})
  handleClick = (username, password) => {
    api.login(username, password)
      .then(({data})=>{
        this.props.onLoginSuccess(data,
          ()=>this.props.history.push('/hello'));
      })
      .catch(err => {
        if(err.response.status === 401){
          this.setState({warning: 'Try again noob!'})
        } else {
          console.error(err)
        }
      })
  }

  render() {
    const { username, password, warning } = this.state

    return (
      <div>
        {warning}
        <br/>
        <UserNameTextBox username={username} onChange={this.handleChange('username')} />
        <br/>
        <PasswordTextbox password={password} onChange={this.handleChange('password')}/>
        <br/>
        <Button color='primary' variant='raised' onClick={
          () => this.handleClick(username, password)
        }>
          {username} wants to login.
        </Button>
      </div>
    );
  }
}

export default withRouter(withAuth(LoginForm))