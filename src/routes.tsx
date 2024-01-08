import { Navigate, createBrowserRouter } from "react-router-dom"
import { getUserIdHook } from "@/customHooks";
import AccountSettings from "@/pages/accountSettings";
import Error from '@/pages/error'
import Home from "@/pages/home"
import Login from "@/pages/auth/login";
import NewRecord from "@/pages/newFile/newRecord";
import NewRecordItemForm from "@/pages/newFile/newRecordItemForm";
import Root from "./Root";
import Details from "@/pages/details/Details";


const user = getUserIdHook();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/accountSettings/:id',
        element: user ? <AccountSettings user={user.result} /> : <Login />,
        errorElement: <Error />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: "/home",
        element: user ? <Home userId={user.result._id} /> : <Login />,
      },
      {
        path: "/home/:recordId",
        element: <Details />,
      },
      {
        path: '/error',
        element: <Error />
      },
      {
        path: "/home/:recordId/newDetails",
        element: <NewRecordItemForm />
      },
      {
        path: "/newRecord",
        element: <NewRecord />
      },
      {
        index: true,
        element: <Navigate to="home" />

      }]
  }
])

export default router;