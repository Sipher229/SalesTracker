import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Sales, AddEmployee, VerifyOtp, Dashboard, PageNotFound, AddSale, Campaigns, AddCampaign, AddGoal, Goals, Campaign, Sale, Goal, ConfirmEmail, ResetPassword, Employees, Employee, MyTeam, MyProfile, AddJobAid, JobAids, Report, Home, Registration, ContactUs, Pricing, Checkout, CompanyPage, SubscriptionNotActive, UpdateSubscription, TermsOfUse, PrivacyPolicy, VerifyRegisteredEmail} from './components/pages/index.js'
import MainBody from './components/page-compontents/dashboard-body/MainBody.jsx'



const router = createBrowserRouter([
  {
    element: <Home />,
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
        path: '/layout/mysales/sale/:id',
        element: <Sale />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/mysales/sale/edit/:id',
        element: <AddSale />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/mysales/sale/edit/:id',
        element: <AddSale />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/dashboard',
        element: <MainBody />,
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
        path: '/layout/allcampaigns/campaign/:id',
        element: <Campaign />,
        errorElement: <PageNotFound />,
      },
      {
        path: '/layout/allcampaigns/campaign/edit/:id',
        element: <AddCampaign />,
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
        path: '/layout/allgoals/goal/:id',
        element: <Goal />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allgoals/goal/edit/:id',
        element: <AddGoal />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/addemployee',
        element: <AddEmployee />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allemployees',
        element: <Employees />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/myteam',
        element: <MyTeam />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/myprofile',
        element: <MyProfile />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allemployees/employee/:id',
        element: <Employee />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allemployees/employee/edit/:id',
        element: <AddEmployee />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/allemployees/employee/report/:id',
        element: <Report />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/addjobaid',
        element: <AddJobAid />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/alljobaids',
        element: <JobAids />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/alljobaids/edit/:id',
        element: <AddJobAid />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/company-profile',
        element: <CompanyPage />,
        errorElement: <PageNotFound />
      },
      {
        path: '/layout/subscription-not-active',
        element: <SubscriptionNotActive />,
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
  },
  {
    path: '/register',
    element: <Registration />,
    errorElement: <PageNotFound />
  },
  {
    path: '/login',
    element: <App />,
    errorElement: <PageNotFound />
  },
  {
    path: '/contact',
    element: <ContactUs />,
    errorElement: <PageNotFound />
  },
  {
    path: '/pricing',
    element: <Pricing />,
    errorElement: <PageNotFound />
  },
  {
    path: '/subscription',
    element: <Checkout />,
    errorElement: <PageNotFound />
  },
  {
    path: '/update-subscription/:id',
    element: <UpdateSubscription />,
    errorElement: <PageNotFound />
  },
  {
    path: '/terms-of-use',
    element: <TermsOfUse />,
    errorElement: <PageNotFound />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    errorElement: <PageNotFound />
  },
  {
    path: '/email-verification',
    element: <VerifyRegisteredEmail />,
    errorElement: <PageNotFound />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
