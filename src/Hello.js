import React from 'react'
import {withAuth} from 'react-router-auth-provider'
import { Button } from 'material-ui';

function Hello({authInfo, onLogout}){
  return (
    <div>
      Hello {authInfo.username}
      <Button variant="raised" onClick={()=>onLogout()}>
        Logout
      </Button>
    </div>)
}

export default withAuth(Hello)

