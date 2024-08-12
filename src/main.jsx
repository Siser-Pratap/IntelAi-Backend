import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {HomePage, ChatPage, DashBoard, SignInPage, SignUpPage} from "./routes"
import RootLayout from './layouts/RootLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element:<HomePage />
      },
      {
        path:"/sign-in/*",
        element:<SignInPage />
      },
      {
        path:"/sign-up/*",
        element:<SignUpPage />
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashBoard />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
    ]
    }]);


    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
