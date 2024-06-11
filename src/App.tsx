import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from '@/routes'
import { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    alert("Hi! Nathaniel here. I am sorry to inform you that this application is not working because of the discontinuation of cyclic.sh which is responsible for hosting the server of this app. I will update as soon as I find another free hosting website. Thank you for understanding.")
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
