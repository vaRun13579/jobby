import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

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
    const {navigate} = this.props
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
      navigate("/", {replace:true})
    } else {
      this.setState({isFail: true, errMsg: data.error_msg})
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    const {username, password, isFail, errMsg} = this.state

    if (token !== undefined) {
      return <Navigate to="/" />
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

export default withRouter(LoginPage)
