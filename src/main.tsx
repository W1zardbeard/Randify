import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import ErrorPage from './pages/ErrorPage' 
import Dashboard from './pages/Dashboard'
import Test from './pages/Test'
import AuthHook from './hooks/AuthHook'
import Genres from './pages/Genres'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",	
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/genres",
    element: <Genres />,
  }

]);

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>
)
