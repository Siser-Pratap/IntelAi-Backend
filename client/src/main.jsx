import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HomePage, ChatPage, DashBoard, SignInPage, SignUpPage } from "./routes";
import RootLayout from './layouts/RootLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage.jsx';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();




const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />
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
      {
        path: "*", // Wildcard route for 404
        element: <NotFoundPage />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
