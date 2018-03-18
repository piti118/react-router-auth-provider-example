import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withRouter, Link } from 'react-router-dom';
import { withAuth } from 'react-router-auth-provider';
import { Button } from 'material-ui';

const styles = {
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-around'
  }
};

function LoginLinkBase({isLoggedIn, onLogout}) {
  if(isLoggedIn){
    return <Button onClick={()=>onLogout()}> Logout </Button>
  } else {
    return <Link to='/login'> Login </Link>
  }
}

const LoginLink = withRouter(withAuth(LoginLinkBase))

function SimpleAppBarBase(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <Link to='/'>Index(Public)</Link>
          <Link to='/about'>About(Public)</Link>
          <Link to='/hello'>Hello(Login Required)</Link>
          <Link to='/admin'>Admin Only</Link>
          <LoginLink/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBarBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleAppBar = withRouter(withStyles(styles)(SimpleAppBarBase));

export default function Page({children}){
  return (
    <div>
      <SimpleAppBar/>
      {children}
    </div>
  )
}