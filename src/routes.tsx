import { Navigate, createBrowserRouter } from "react-router-dom"
import Home from "@/pages/home"
import { getUserIdHook } from "@/customHooks/getUserIdHook";
import About from "@/pages/about";
import NewRecord from "@/pages/newFile/newRecord";
import NewRecordItemForm from "@/pages/newFile/newRecordItemForm";
import CardDetails from "@/pages/details";
import Error from '@/pages/error'
import Login from "@/pages/auth/login";


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

export default router;