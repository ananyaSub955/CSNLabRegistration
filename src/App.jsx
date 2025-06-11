import React from 'react'
import Login from './pages/Login'
import LogInEntry from './pages/LogInEntry';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout';
import StudentHistoryLayout from './layout/StudentHistoryLayout';
import HistoryDate from './components/HistoryDate';
import HistoryForm from './components/HistoryForm.jsx';
import NotFound from './components/NotFound.jsx';
import JobsLayout from './layout/JobsLayout.jsx';
import Jobs, { jobsLoader } from './pages/Jobs.jsx';
import JobDetails, { JobDetailsLoader } from './components/JobDetails.jsx';
import Error from './components/Error.jsx';


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='logentry' element={<LogInEntry />} />
        <Route path='history' element={<StudentHistoryLayout />}>
          <Route path='date' element={<HistoryDate />} />
          <Route path='form' element={<HistoryForm />} />
        </Route>
        <Route path='jobs' element={<JobsLayout />} errorElement = {<Error/>}>
          <Route index element={<Jobs />} loader={jobsLoader} />
          <Route path=':id' element={<JobDetails />} loader = {JobDetailsLoader} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App