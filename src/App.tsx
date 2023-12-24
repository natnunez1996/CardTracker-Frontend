import { RouterProvider } from 'react-router-dom'
import './App.css'
import Header from '@/shared/header'
import { getUserIdHook } from '@/customHooks';
import router from '@/routes'

function App() {

  const user = getUserIdHook();

  return (
    <div className="App">
      <Header userProfile={user} />
      <div className="body">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
