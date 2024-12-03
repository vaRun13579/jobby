import Cookies from 'js-cookie'
<<<<<<< HEAD
import {Redirect} from 'react-router-dom'
=======
import {Navigate, useNavigate} from 'react-router-dom'
>>>>>>> master
import {Component} from 'react'

import './index.css'

<<<<<<< HEAD
=======
function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

>>>>>>> master
class LoginPage extends Component {
  state = {username: '', password: '', isFail: false, errMsg: ''}

  updatePassword = ev => {
    this.setState({password: ev.target.value})
  }

  updateUsername = ev => {
    this.setState({username: ev.target.value})
  }

  checkDetails = async ev => {
    ev.preventDefault()
    const {username, password} = this.state
<<<<<<< HEAD
    const {history} = this.props
=======
    const {navigate} = this.props
>>>>>>> master
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log('response', response)
    if (response.ok) {
      const token = data.jwt_token
      // console.log('jwt token :', token)
      Cookies.set('jwt_token', token, {expires: 30})
      this.setState({isFail: false})
<<<<<<< HEAD
      history.replace('/')
=======
      navigate("/", {replace:true})
>>>>>>> master
    } else {
      this.setState({isFail: true, errMsg: data.error_msg})
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    const {username, password, isFail, errMsg} = this.state

    if (token !== undefined) {
<<<<<<< HEAD
      return <Redirect to="/" />
=======
      return <Navigate to="/" />
>>>>>>> master
    }

    return (
      <div className="login-page">
        <p
          style={{
            color: 'white',
            position: 'absolute',
            top: '20px',
            left: '20px',
          }}
        >
          use this credentials for Login &#123;username: rahul; password:
          rahul@2021&#125;, &#123;username: raja; password: raja@2021&#125;
        </p>
        <form className="login-container" onSubmit={this.checkDetails}>
          <div className="display-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <br />
          <input
            id={username}
            placeholder="Username"
            type="text"
            className="input"
            value={username}
            onChange={this.updateUsername}
          />
          <br />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <br />
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={this.updatePassword}
          />
          <br />
          <button className="login-button" type="submit">
            Login
          </button>
          {isFail && <p className="err-display">{`*${errMsg}`}</p>}
        </form>
      </div>
    )
  }
}

<<<<<<< HEAD
export default LoginPage
=======
export default withRouter(LoginPage)
>>>>>>> master
