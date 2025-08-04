import React from 'react'
import Login from './pages/Login'
import LogInEntry from './Student/LogInEntry.jsx';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout';
import StudentLayout from './Student/layout/StudentLayout.jsx'
import StudentHistoryLayout from './layout/StudentHistoryLayout';
import HistoryDate from './components/HistoryDate';
import HistoryForm from './components/HistoryForm.jsx';
import NotFound from './components/NotFound.jsx';
import JobsLayout from './layout/JobsLayout.jsx';
import Jobs, { jobsLoader } from './pages/Jobs.jsx';
import JobDetails, { JobDetailsLoader } from './components/JobDetails.jsx';
import Error from './components/Error.jsx';
import SignUp from './pages/SignUp.jsx';
import EditEntry from './Student/components/EditEntry.jsx';


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path = 'signUp' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Route>

      <Route path='student' element={<StudentLayout />}>
        <Route path='logentry' element={<LogInEntry />} />
        <Route path='history' element={<StudentHistoryLayout />} />
        <Route path="editEntry/:id" element={<EditEntry />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App