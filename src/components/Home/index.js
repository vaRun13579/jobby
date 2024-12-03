import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (

  <div className="main-container">
    <Header />
    <div className="home-container">
      <div className="content-holder">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          review. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" style={{textDecoration: 'none', color: 'white'}}>
          <button className="jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home;