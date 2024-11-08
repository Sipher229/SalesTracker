import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Sales, VerifyOtp, Dashboard, PageNotFound, AddSale, Report, Campaigns, AddCampaign, AddGoal, Goals, Campaign, Sale, Goal, ConfirmEmail, ResetPassword} from './components/pages/index.js'
import MainBody from './components/page-compontents/dashboard-body/MainBody.jsx'


const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <PageNotFound />,
    path: '/',
  },
  {
    element: <Dashboard />,
    path: '/layout',
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/layout/mysales',
        element: <Sales />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/mysales/sale',
        element: <Sale />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/dashboard',
        element: <MainBody />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/myreport',
        element: <Report />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/newsale',
        element: <AddSale />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/addcampaign',
        element: <AddCampaign />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allcampaigns',
        element: <Campaigns />,
        errorElement: <PageNotFound />,
      },
      {
        path: '/layout/allcampaigns/campaign',
        element: <Campaign />,
        errorElement: <PageNotFound />,
      },
      {
        path: '/layout/addgoal',
        element: <AddGoal />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allgoals',
        element: <Goals />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allgoals/goal',
        element: <Goal />,
        errorElement: <PageNotFound />
      },
    ]
  },
  {
    path: '/confirmemail',
    element: <ConfirmEmail />,
    errorElement: <PageNotFound />
  },
  {
    path: '/resetpassword',
    element: <ResetPassword />,
    errorElement: <PageNotFound />
  },
  {
    path: '/verifyotp',
    element: <VerifyOtp />,
    errorElement: <PageNotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
