import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import ErrorPage from './pages/ErrorPage' 
import Dashboard from './pages/Dashboard'
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
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
  </>
)
