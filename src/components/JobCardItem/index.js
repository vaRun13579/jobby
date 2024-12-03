import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

<<<<<<< HEAD
export default props => {
=======
const JobCardItem =  props => {
>>>>>>> master
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    id,
    rating,
    title,
  } = item

  return (
    <li className="job-item-container">
      <Link to={`/jobs/${id}`} className="link-container">
        <div className="logo-name-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
<<<<<<< HEAD
=======

export default JobCardItem;
>>>>>>> master
