import { Navigate, createBrowserRouter } from 'react-router-dom'
import { getUserIdHook } from '@/customHooks'
import Root from './Root'
import AccountSettings from './pages/AccountSettings/AccountSettings'
import Details from './pages/Details/Details'
import Error from './pages/Error/Error'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login/LogIn'
import NewRecord from './pages/NewFile/NewRecord'
import NewRecordItemForm from './pages/NewFile/NewRecordItemForm'

const user = getUserIdHook()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/accountSettings/:id',
        element: user !== undefined ? <AccountSettings user={user.result} /> : <Login />,
        errorElement: <Error />
      },
      {
        path: '/home',
        element: user !== undefined ? <Home userId={user.result._id} /> : <Login />
      },
      {
        path: '/home/:recordId',
        element: <Details />
      },
      {
        path: '/error',
        element: <Error />
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
