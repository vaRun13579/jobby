import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const ProtectedRoute= ({children}) => {
  console.log("children obj",children);
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" />
  }
  return children
}

export default ProtectedRoute;