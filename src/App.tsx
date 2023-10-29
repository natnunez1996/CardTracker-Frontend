import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from '@/shared/navbar'
import CardDetails from '@/pages/details'
import Login from '@/pages/auth/login'
import Header from '@/shared/header'
import About from '@/pages/about'
import Home from '@/pages/home'
import NewRecord from '@/pages/newFile/newRecord'
import NewRecordItemForm from '@/pages/newFile/newRecordItemForm'
import Error from '@/pages/error'
import { getUserIdHook } from '@/customHooks/getUserIdHook';

function App() {
  const user = getUserIdHook();

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home userId={user?.result?._id} />,
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/newRecord",
      element: <NewRecord />
    },
    {
      path: "/home/:recordId/newDetails",
      element: <NewRecordItemForm />
    },
    {
      path: "/home/:recordId",
      element: <CardDetails />,
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/error',
      element: <Error userId={user?.result?._id} />
    },
    {
      index: true,
      element: <Navigate to="home" />

    }
  ])





  return (
    <div className="App">
      <Header userProfile={user} />
      <div className="body">
        {user &&
          <Navbar />
        }
        <div className="mainContainer">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  )
}

export default App
