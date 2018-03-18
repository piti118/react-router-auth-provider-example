# react-router-auth-provider Example

Example for [react-router-auth-provider](https://github.com/piti118/react-router-auth-provider).

# Running instruction
## Backend
A simple flask based backend is included in the directory backend. 
To run just go into backend directory and
``
python main.py
``

## Frontend
A simple demo for frontend
```
yarn install
yarn start
```
Try username:piti password:1234 for demonstration.

### Couple things to note
#### App.js
- in `App.js` AuthProvider wrapped around everything. To provide authentication context.
- AuthRoute is a Route that require both isLoggedIn and roleCheck to be true.
    If false user will be redirected to login page.
    
#### Page.js
- Every child component can access auth context(eg: username) via withAuth HOC.
- Notice how login and logout at the top bar changes when you login/logout.
- Logging out can be done by calling onLogout.

#### Hello.js
- child component can grab authInfo to use the username.
- Notice how it says hello. 

#### LoginForm.js
- LoginForm calls onLoginSuccess to notify the AutorizationProvider to change the context.
