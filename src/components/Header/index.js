<<<<<<< HEAD
import {Link, withRouter} from 'react-router-dom'
=======
import {Link, useNavigate} from 'react-router-dom'
>>>>>>> master
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

<<<<<<< HEAD
export default withRouter(props => {
  const {history} = props
  const logout = () => {
    Cookies.remove('jwt_token', {path: '/'})
    history.replace('/login')
=======
const Header = () => {
  const navigate=useNavigate();
  const logout = () => {
    Cookies.remove('jwt_token', {path: '/'})
    navigate("/login", {replace:true});
>>>>>>> master
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-header"
        />
      </Link>
      <ul className="links-container">
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            Jobs
          </Link>
        </li>
      </ul>
      <button className="logout-button" type="button" onClick={logout}>
        Logout
      </button>

      <ul className="mobile-links-container">
        <li>
          <Link to="/" className="link">
            <AiFillHome className="header-icons" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            <BsBriefcaseFill className="header-icons" />
          </Link>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <button
            className="mobile-logout-button"
            onClick={logout}
            type="button"
          >
            <FiLogOut className="header-icons" />
          </button>
        </li>
      </ul>
    </div>
  )
<<<<<<< HEAD
})
=======
}

export default Header;
>>>>>>> master
