import React from 'react';
import { 
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import Home from './Home'

import '../css/bootstrap/css/bootstrap.min.css'
import '../css/font-awesome/css/font-awesome.min.css'
import '../css/sb-admin.css'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    loggedIn: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className='bg-dark' style={{ height: '100vh' }}>
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input className="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input className="form-control" id="exampleInputPassword1" type="password" placeholder="Password"/>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox"/> Remember Password</label>
                </div>
              </div>
            </form>
              <button onClick={this.login} className="btn btn-primary btn-block" href="index.html">Login</button>
            <div className="text-center">
              <a className="d-block small mt-3" href="register.html">Register an Account</a>
              <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const App = () => {
  return (
    <main>
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/' component={Home} />
        {/* <PrivateRoute path='/' render={()=><Home title={'Home'}/>} /> */}
      </Switch>
    </main>
  )
}

export default App