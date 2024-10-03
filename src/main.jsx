import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PageNotFound from './components/pages/PageNotFound.jsx'
import Dashboard  from './components/pages/Dashboard.jsx'
import Registration from './components/pages/Registration.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <PageNotFound />,
    path: '/',
  },
  {
    element: <Dashboard />,
    path: '/dashboard',
    errorElement: <PageNotFound />
  },
  {
    path: '/register',
    element: <Registration />,
    errorElement: <PageNotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
