import { Navigate, createBrowserRouter } from 'react-router-dom'
import { getUserIdHook } from '@/customHooks'
import Root from './Root'
import AccountSettings from './pages/AccountSettings/AccountSettings'
import NewRecord from './pages/NewFile/NewRecord'
import NewRecordItemForm from './pages/NewFile/NewRecordItemForm'
import ErrorPage from './pages/Error/ErrorPage';
import LoginPage from '@/pages/Auth/LoginPage'
import HomePage from '@/pages/Home/HomePage'
import DetailsPage from './pages/Details/DetailsPage'

const user = getUserIdHook()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/accountSettings/:id',
        element: user !== undefined ? <AccountSettings user={user.result} /> : <LoginPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/home',
        element: user !== undefined ? <HomePage userId={user.result._id} /> : <LoginPage />
      },
      {
        path: '/home/:recordId',
        element: <DetailsPage />
      },
      {
        path: '/error',
        element: <ErrorPage />
      },
      {
        path: '/home/:recordId/newDetails',
        element: <NewRecordItemForm />
      },
      {
        path: '/newRecord',
        element: <NewRecord />
      },
      {
        index: true,
        element: <Navigate to="home" />

      }]
  }
])

export default router
