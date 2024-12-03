import Cookies from 'js-cookie'
import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import formateObj from '../formateObject'
import './index.css'

class ProfileCard extends Component {
  state = {
    isLoading: true,
    profileImageUrl: '',
    shortBio: '',
    name: '',
    view: true,
  }

  fetchData = async () => {
    this.setState({isLoading: true})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    // console.log('response from profile card:', response)
    if (response.ok) {
      const data = await response.json()
      const details = data.profile_details
      const {name, profileImageUrl, shortBio} = formateObj(details)
      // console.log('success view called in profile card')
      this.setState({
        isLoading: false,
        name,
        profileImageUrl,
        shortBio,
        view: true,
      })
    } else {
      // console.log('fail profile view called')
      this.setState({isLoading: false, view: false})
    }
  }

  renderSuccessView = () => {
    const {profileImageUrl, name, shortBio} = this.state
    return (
      <div className="profile-container">
        <div className="profile-card">
          <img src={profileImageUrl} alt={name} className="profile-pic" />
          <h1 className="profile-name">{name}</h1>
          <p className="bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderFailView = () => (
    <div className="profile-container">
      <button className="retry-button" type="button" onClick={this.fetchData}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  componentDidMount = () => {
    this.fetchData()
  }

  renderView = () => {
    const {isLoading, view} = this.state
    // console.log('isloading, view', isLoading, view)
    if (isLoading) {
      return this.renderLoader()
    }
    if (view) {
      return this.renderSuccessView()
    }
    return this.renderFailView()
  }

  render() {
    return this.renderView()
  }
}

export default ProfileCard
