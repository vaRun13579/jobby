import {Component} from 'react'
import {useParams} from "react-router-dom"
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import Header from '../Header'
import formateObject from '../formateObject'
import './index.css'

function withRouter(Component) {
  return (props) => {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}

const pageStates = ['Loading', 'Success', 'Fail']

class JobDetailsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobDetails: {},
      similarJobs: [],
      pageView: pageStates[0],
      // id: this.props.match.params.id,
    }
  }

  fetchData = async () => {
    const {params} = this.props
    const {id} = params
    // const {id} = this.state
    const token = Cookies.get('jwt_token')
    this.setState({pageView: pageStates[0]})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const jobDetails = formateObject(data.job_details)
        const similarJobs = data.similar_jobs.map(ele => formateObject(ele))
        console.log('data:', data)
        console.log('formated data - ', jobDetails)
        console.log('similar jobs - ', similarJobs)
        this.setState({
          jobDetails,
          similarJobs,
          pageView: pageStates[1],
        })
      } else {
        this.setState({pageView: pageStates[2]})
      }
    } catch (er) {
      // console.log('error:', er)
      this.setState({pageView: pageStates[2]})
    }
  }

  renderLoader = () => (
    <div className="fail-view-display-container">
      <div className="loader-container" data-testid="loader">
        <ThreeDots color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

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
      <button className="retry-button" type="button" onClick={this.fetchData}>
        Retry
      </button>
    </div>
  )

  RenderSimilarJobs = prop => {
    const {item} = prop
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = item

    return (
      <li className="similar-job-item">
        <div className="logo-name-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-description-container">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
          <div className="location-jobtype-container">
            <div className="location-type">
              <MdLocationOn className="details-icon" />
              <p className="details-para">{location}</p>
            </div>
            <div className="location-type">
              <BsBriefcaseFill className="details-icon" />
              <p className="details-para">{employmentType}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="job-details-page-container">
        <div className="job-item-container">
          <div className="logo-name-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="location-type-container">
              <div className="location-type">
                <MdLocationOn className="details-icon" />
                <p className="details-para">{location}</p>
              </div>
              <div className="location-type">
                <BsBriefcaseFill className="details-icon" />
                <p className="details-para">{employmentType}</p>
              </div>
            </div>
            <p className="package-para">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="job-description-container">
            <div className="web-link-container">
              <h1 className="description-heading">Description</h1>
              <div>
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  className="web-link"
                  rel="noreferrer"
                >
                  Visit <FaExternalLinkAlt className="redirect-icon" />
                </a>
              </div>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <h1 className="description-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(ele => (
              <li key={ele.name} className="skill-item">
                <img
                  src={ele.image_url}
                  alt={ele.name}
                  className="skill-logo"
                />
                <p className="skill-name">{ele.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <div>
              <h1 className="description-heading">Life at Company</h1>
              <p className="job-description">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(ele => (
            <this.RenderSimilarJobs key={ele.id} item={ele} />
          ))}
        </ul>
      </div>
    )
  }

  componentDidMount = () => {
    this.fetchData()
  }

  renderSwitch = statusState => {
    console.log('status switch', statusState)
    switch (statusState) {
      case pageStates[0]:
        return this.renderLoader()
      case pageStates[1]:
        return this.renderSuccessView()
      case pageStates[2]:
        return this.displayFailView()
      default:
        return <p>Oops unknown status state.</p>
    }
  }

  render() {
    const {pageView} = this.state
    // console.log('state information', this.state)
    return (
      <div className="main-container">
        <Header />
        {this.renderSwitch(pageView)}
      </div>
    )
  }
}

export default withRouter(JobDetailsPage)
