<<<<<<< HEAD
import {Route, Switch, Redirect} from 'react-router-dom'
=======

import {Route, Routes, Navigate} from 'react-router-dom'
>>>>>>> master

import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import Home from './components/Home'
import JobDetailsPage from './components/JobDetailsPage'
import LoginPage from './components/LoginPage'
import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here
const App = () => {
  const CallJobs = () => (
    <Jobs
      employmentTypesList={employmentTypesList}
      salaryRangesList={salaryRangesList}
    />
  )

  return (
<<<<<<< HEAD
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={CallJobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetailsPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
=======
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/jobs" element={<ProtectedRoute><CallJobs/></ProtectedRoute>}/>
      <Route path="/jobs/:id" element={<ProtectedRoute><JobDetailsPage/></ProtectedRoute>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/not-found" element={<NotFound/>} />
      <Route path="*" element={<Navigate to="not-found" />}/>
    </Routes>
>>>>>>> master
  )
}

export default App
