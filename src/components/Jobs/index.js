import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'

import ProfileCard from '../ProfileCard'
import JobCardItem from '../JobCardItem'
import Header from '../Header'

import './index.css'

const status = ['Loading', 'Success', 'Fail']

let employlinkList = []

class Jobs extends Component {
  state = {
    jobsList: [],
    search: '',
    employment: '',
    salaryRange: '',
    pageStatus: status[0],
    tempSearch: '',
  }

  renderLoader = () => (
    <div className="fail-view-display-container">
      <div className="loader-container" data-testid="loader">
        <ThreeDots type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  updateSearch = ev => {
    this.setState({tempSearch: ev.target.value})
  }

  updateEmployment = ev => {
    const {value} = ev.target
    const enquirey = employlinkList.includes(value)
    if (ev.target.checked) {
      if (!enquirey) {
        employlinkList = [...employlinkList, value]
      }
    } else if (enquirey) {
      employlinkList = employlinkList.filter(ele => ele !== value)
    }
    this.setState({employment: employlinkList.join(',')}, this.fetchRequest)
  }

  updateSalaryRange = ev => {
    this.setState({salaryRange: ev.target.value}, this.fetchRequest)
  }

  makeSearch = ev => {
    ev.preventDefault()
    this.setState(pv => ({search: pv.tempSearch}), this.fetchRequest)
  }

  fetchRequest = async () => {
    // console.log('fetch request called')
    this.setState({pageStatus: status[0]})
    const token = Cookies.get('jwt_token', {path: '/'})
    const {search, employment, salaryRange} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salaryRange}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      const formatedData = data.jobs.map(ele => ({
        companyLogoUrl: ele.company_logo_url,
        employmentType: ele.employment_type,
        id: ele.id,
        jobDescription: ele.job_description,
        location: ele.location,
        packagePerAnnum: ele.package_per_annum,
        rating: ele.rating,
        title: ele.title,
      }))
      // console.log('data:', formatedData)
      if (response.ok) {
        this.setState({pageStatus: status[1], jobsList: formatedData})
      } else {
        this.setState({pageStatus: status[2]})
      }
    } catch (er) {
      console.log('error:', er)
      this.setState({pageStatus: status[2]})
    }
  }

  displayFailView = () => (
    // console.log('display fail view')
    <div className="fail-view-display-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-jobs-view"
      />
      <h1 className="fail-view-heading">Oops! Something Went Wrong</h1>
      <p className="fail-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.retryFunction}
      >
        Retry
      </button>
    </div>
  )

  renderDisplayList = () => {
    const {jobsList} = this.state
    // console.log('Display List Called')

    if (jobsList.length === 0) {
      return (
        <div className="fail-view-display-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-display-container">
        {jobsList.map(ele => (
          <JobCardItem key={ele.id} item={ele} />
        ))}
      </ul>
    )
  }

  renderPageLayout = () => {
    const {employmentTypesList, salaryRangesList} = this.props
    const {tempSearch, pageStatus} = this.state
    // console.log('Page Layout called', salaryRangesList)
    return (
      <div className="main-container">
        <Header />
        <div className="jobs-layout-container">
          <div className="filters-container">
            <form
              onSubmit={this.makeSearch}
              className="mobile-search-container"
            >
              <input
                type="search"
                aria-label="search bar"
                value={tempSearch}
                className="search-bar"
                placeholder="Search"
                onChange={this.updateSearch}
              />
              <button
                className="search-icon-container"
                type="submit"
                aria-label="search button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </form>
            <div className="profile-container">
              <ProfileCard />
            </div>
            <hr className="line" />
            <h1 className="select-heading">Type Of Employment</h1>
            <ul className="select-list-container">
              {employmentTypesList.map(ele => (
                <li className="list-item-container" key={ele.employmentTypeId}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id={ele.employmentTypeId}
                    value={ele.employmentTypeId}
                    onChange={this.updateEmployment}
                  />
                  <label className="label" htmlFor={ele.employmentTypeId}>
                    {ele.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="line" />
            <h1 className="select-heading">Salary Range</h1>
            <ul className="select-list-container">
              {salaryRangesList.map(ele => (
                <li className="list-item-container" key={ele.salaryRangeId}>
                  <input
                    className="radio"
                    type="radio"
                    id={ele.salaryRangeId}
                    value={ele.salaryRangeId}
                    onChange={this.updateSalaryRange}
                    name="salaryRange"
                  />
                  <label className="label" htmlFor={ele.salaryRangeId}>
                    {ele.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-display-search-container">
            <form onSubmit={this.makeSearch} className="search-container">
              <input
                type="search"
                aria-label="search bar"
                value={tempSearch}
                className="search-bar"
                placeholder="Search"
                onChange={this.updateSearch}
              />
              <button
                type="submit"
                aria-label="search button"
                className="search-icon-container"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </form>
            {this.renderSwitch(pageStatus)}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount = () => {
    this.fetchRequest()
  }

  retryFunction = () => {
    this.fetchRequest()
  }

  renderSwitch = statusState => {
    // console.log('status switch', statusState)
    switch (statusState) {
      case status[0]:
        return this.renderLoader()
      case status[1]:
        return this.renderDisplayList()
      case status[2]:
        return this.displayFailView()
      default:
        return <p>Oops unknown status state.</p>
    }
  }

  render() {
    // console.log('render called:', this.state)
    return this.renderPageLayout()
  }
}

export default Jobs
